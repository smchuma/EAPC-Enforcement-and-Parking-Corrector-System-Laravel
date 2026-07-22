<?php

namespace App\Http\Controllers\Taarifa;

use App\Http\Controllers\Controller;
use App\Models\ControlNumber;
use App\Models\Report;
use App\Models\User;
use App\Rules\ControlNumberUnique;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    //

    public function index(Request $request) {

        $query = Report::where('user_id', Auth::id());

        if($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        return Inertia::render("Taarifa/Ripoti", [
           "reports"=> $query->with("control_number")->orderByDesc('created_at')->paginate(10)->withQueryString(),
           "supervisors" => User::where('role', 'supervisor')->get(['id', 'first_name', 'last_name']),
        ]);
    }

    public function storeSales(Request $request) {

        $userId = Auth::id();

        $request->validate([
            'supervisor_id' => ['nullable', 'exists:users,id,role,supervisor'],
            'daily_sales' => 'required|numeric',
            'sales_proof_image' => 'required|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('sales_proof_image')) {
            $imagePath = $request->file('sales_proof_image')->store('sales_proof_images', 'public');
        }

        Report::create([
            'user_id' => $userId,
            'supervisor_id' => $request->input('supervisor_id'),
            'daily_sales' => $request->input('daily_sales'),
            'sales_proof_image' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Mauzo yamesajiliwa.');
    }

    public function storeControlNumbers(Request $request) {

        $userId = Auth::id();

        $request->validate([
            'supervisor_id' => ['nullable', 'exists:users,id,role,supervisor'],
            'control_numbers' => 'required|array|min:1',
            'control_numbers.*.number' => [
                'required',
                'regex:/^9986\d+$/',
                new ControlNumberUnique,
            ],
            'control_numbers.*.amount' => 'required|numeric',
        ], [
            'control_numbers.*.number.regex' => 'Mpangilio wa control number hauko sahihi',
        ]);

        // Create the report
        $report = Report::create([
            'user_id' => $userId,
            'supervisor_id' => $request->input('supervisor_id'),
        ]);

      foreach ($request->input('control_numbers') as $controller) {

        $existingController = ControlNumber::where('control_number', $controller['number'])->first();

        if ($existingController) {
            $userWhoSubmitted = $existingController->report->user;

            return redirect()->back()->withErrors([
                'control_numbers' => "The controller number {$controller['number']} has already been submitted by {$userWhoSubmitted->name}."
            ]);
        }

            ControlNumber::create([
            'user_id' => $userId,
            'report_id' => $report->id,
            'control_number' => $controller['number'],
            'amount' => $controller['amount'],
        ]);
    }


        return redirect()->back()->with('success', 'Control numbers zimesajiliwa.');
    }


    public function adminReports(Request $request) {

        $query = Report::query();

        if($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        $reports = $query->with('control_number', 'user')->orderBy('created_at')->get();

        return Inertia::render("Admin/Reports", [
           "reports"=> $this->groupReportsByUserAndDate($reports),
        ]);
    }

    public function adminReportsPdf(Request $request)
    {
        $request->validate([
            'from' => 'required|date',
            'to' => 'required|date|after_or_equal:from',
        ]);

        $from = Carbon::parse($request->input('from'))->startOfDay();
        $to = Carbon::parse($request->input('to'))->endOfDay();

        $reports = Report::whereBetween('created_at', [$from, $to])
            ->with(['control_number', 'user'])
            ->orderBy('created_at')
            ->get();

        $rows = $this->groupReportsByUserAndDate($reports);

        $totals = [
            'daily_sales' => collect($rows)->sum('daily_sales'),
            'control_number_count' => collect($rows)->sum('control_number_count'),
            'control_number_total' => collect($rows)->sum('control_number_total'),
            'grand_total' => collect($rows)->sum('grand_total'),
        ];

        $pdf = Pdf::loadView('pdf.report-list', [
            'title' => 'Full Report',
            'from' => $from->format('Y-m-d'),
            'to' => $to->format('Y-m-d'),
            'rows' => $rows,
            'totals' => $totals,
        ]);

        return $pdf->download("FullReport_{$from->format('Y-m-d')}_to_{$to->format('Y-m-d')}.pdf");
    }

    public function adminReportsCsv(Request $request)
    {
        $request->validate([
            'from' => 'required|date',
            'to' => 'required|date|after_or_equal:from',
        ]);

        $from = Carbon::parse($request->input('from'))->startOfDay();
        $to = Carbon::parse($request->input('to'))->endOfDay();

        $reports = Report::whereBetween('created_at', [$from, $to])
            ->with(['control_number', 'user'])
            ->orderBy('created_at')
            ->get();

        $rows = $this->groupReportsByUserAndDate($reports);

        $filename = "FullReport_{$from->format('Y-m-d')}_to_{$to->format('Y-m-d')}.csv";

        return response()->streamDownload(function () use ($rows) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Date', 'Name', 'Role', 'Mauzo Total', 'Control Number Count', 'Control Number Total', 'Grand Total']);
            foreach ($rows as $row) {
                fputcsv($handle, [
                    $row['date'],
                    $row['name'],
                    $row['role'],
                    $row['daily_sales'],
                    $row['control_number_count'],
                    $row['control_number_total'],
                    $row['grand_total'],
                ]);
            }
            fclose($handle);
        }, $filename, ['Content-Type' => 'text/csv']);
    }

    /**
     * Group a collection of Reports into one summary row per (user, day),
     * so a person who submitted multiple times in a day appears once.
     */
    private function groupReportsByUserAndDate($reports): array
    {
        return $reports
            ->groupBy(function ($report) {
                return $report->user_id . '|' . $report->created_at->format('Y-m-d');
            })
            ->map(function ($dayReports) {
                $first = $dayReports->first();
                $user = $first->user;

                $dailySalesEntries = $dayReports
                    ->filter(fn ($r) => $r->daily_sales !== null)
                    ->map(fn ($r) => [
                        'amount' => (float) $r->daily_sales,
                        'image' => $r->sales_proof_image,
                        'time' => $r->created_at->format('H:i'),
                    ])
                    ->values();

                $controlNumbers = $dayReports
                    ->flatMap(fn ($r) => $r->control_number)
                    ->map(fn ($cn) => [
                        'control_number' => $cn->control_number,
                        'amount' => (float) $cn->amount,
                    ])
                    ->values();

                $dailySalesTotal = $dailySalesEntries->sum('amount');
                $controlNumberTotal = $controlNumbers->sum('amount');

                return [
                    'date' => $first->created_at->format('Y-m-d'),
                    'user_id' => $first->user_id,
                    'name' => $user ? "{$user->first_name} {$user->last_name}" : 'Unknown',
                    'role' => $user->role ?? '-',
                    'daily_sales' => $dailySalesTotal,
                    'daily_sales_entries' => $dailySalesEntries,
                    'control_numbers' => $controlNumbers,
                    'control_number_count' => $controlNumbers->count(),
                    'control_number_total' => $controlNumberTotal,
                    'grand_total' => $dailySalesTotal + $controlNumberTotal,
                ];
            })
            ->sortByDesc('date')
            ->values()
            ->all();
    }

    public function target_reports(Request $request) {

        $query = Report::query();
        $users = User::get();

        if($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        return Inertia::render("Admin/TargetReports", [
           "reports"=> $query->with("control_number", "user")->orderByDesc('created_at')->paginate(5),
           "users" => $users
        ]);
    }


    //target- reports

    public function collector_daily_sales_report(Request $request){

        $query = Report::query();

        $users = User::where('role', 'collector')->get();

        if($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        $reports = $query->with('user')
        ->whereIn('user_id', $users->pluck('id'))
        ->get()
        ->groupBy(function ($report) {
            return $report->created_at->format('Y-m-d'); // Group by date
        })
        ->map(function ($dailyReports, $date) {
            return $dailyReports->map(function ($report) use ($date) {
                return [
                    "user_id" =>  $report->user->id,
                    'first_name' => $report->user->first_name,
                    'last_name' => $report->user->last_name,
                    'mtaa' => $report->user->street,
                    'target' => $report->user->target,
                    'date' => $date,
                    'sales' => $report->daily_sales,
                ];
            });
        });





        return Inertia::render("Admin/Reports/CollectorDailySales", [
            "reports" => $reports,
        ]);
    }


    public function collector_control_number_sales_report(Request $request){

        $query = ControlNumber::query();

        $users = User::where('role', 'collector')->get();

        if($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        $reports = $query->with('user')
        ->whereIn('user_id', $users->pluck('id'))
        ->get()
        ->groupBy(function ($report) {
            return $report->created_at->format('Y-m-d'); // Group by date
        })
        ->map(function ($dailyReports, $date) {
            return $dailyReports->map(function ($report) use ($date) {
                return [
                    "user_id" =>  $report->user->id,
                    'first_name' => $report->user->first_name,
                    'last_name' => $report->user->last_name,
                    'mtaa' => $report->user->street,
                    'control_number_target' => $report->user->control_number_target,
                    'control_number' => $report->control_number,
                    'date' => $date,
                    'sales' => $report->amount,
                ];
            });
        });


        return Inertia::render("Admin/Reports/CollectorControlNumberSales", [
            "reports" => $reports,
           "users" => $users
        ]);
    }



    public function enforcement_control_number_sales_report(Request $request){

        $query = ControlNumber::query();

        $users = User::where('role', 'enforcement')->get();

        if($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        $reports = $query->with('user')
        ->whereIn('user_id', $users->pluck('id'))
        ->get()
        ->groupBy(function ($report) {
            return $report->created_at->format('Y-m-d'); // Group by date
        })
        ->map(function ($dailyReports, $date) {
            return $dailyReports->map(function ($report) use ($date) {
                return [
                    "user_id" =>  $report->user->id,
                    'first_name' => $report->user->first_name,
                    'last_name' => $report->user->last_name,
                    'mtaa' => $report->user->street,
                    'control_number_target' => $report->user->control_number_target,
                    'control_number' => $report->control_number,
                    'date' => $date,
                    'sales' => $report->amount,
                ];
            });
        });

        return Inertia::render("Admin/Reports/EnforcementControlNumberSales", [
            "reports" => $reports,
           "users" => $users
        ]);
    }


    public function collector_daily_sales_report_pdf(Request $request)
    {
        $query = Report::query();

        $users = User::where('role', 'collector')->get();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        $reports = $query->with('user')
            ->whereIn('user_id', $users->pluck('id'))
            ->orderBy('created_at')
            ->get();

        $dates = $reports->map(fn ($report) => $report->created_at->format('Y-m-d'))
            ->unique()
            ->values();

        $rows = [];
        foreach ($reports as $report) {
            $userId = $report->user->id;

            if (! isset($rows[$userId])) {
                $rows[$userId] = [
                    'name' => "{$report->user->first_name} {$report->user->last_name}",
                    'mtaa' => $report->user->street,
                    'target' => $report->user->target,
                    'dates' => [],
                ];
            }

            $target = $rows[$userId]['target'];
            $percentage = $target ? min(round(($report->daily_sales / $target) * 100), 100) : 0;
            $rows[$userId]['dates'][$report->created_at->format('Y-m-d')] = $percentage;
        }

        $pdf = Pdf::loadView('pdf.target-report', [
            'title' => 'Parking Collector Report',
            'targetLabel' => 'Target',
            'dates' => $dates,
            'rows' => array_values($rows),
        ]);

        return $pdf->download('CollectorDailySalesReport.pdf');
    }

    public function collector_control_number_sales_report_pdf(Request $request)
    {
        return $this->controlNumberSalesReportPdf(
            $request,
            'collector',
            'Parking Collector Control Number Sales Report',
            'CollectorControlNumberSalesReport.pdf'
        );
    }

    public function enforcement_control_number_sales_report_pdf(Request $request)
    {
        return $this->controlNumberSalesReportPdf(
            $request,
            'enforcement',
            'Parking Enforcement Control Number Sales Report',
            'EnforcementControlNumberSalesReport.pdf'
        );
    }

    private function controlNumberSalesReportPdf(Request $request, string $role, string $title, string $filename)
    {
        $query = ControlNumber::query();

        $users = User::where('role', $role)->get();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        $controlNumbers = $query->with('user')
            ->whereIn('user_id', $users->pluck('id'))
            ->orderBy('created_at')
            ->get();

        $dates = $controlNumbers->map(fn ($cn) => $cn->created_at->format('Y-m-d'))
            ->unique()
            ->values();

        $rows = [];
        foreach ($controlNumbers as $controlNumber) {
            $userId = $controlNumber->user->id;

            if (! isset($rows[$userId])) {
                $rows[$userId] = [
                    'name' => "{$controlNumber->user->first_name} {$controlNumber->user->last_name}",
                    'mtaa' => $controlNumber->user->street,
                    'target' => (int) $controlNumber->user->control_number_target,
                    'totalSales' => 0,
                    'dates' => [],
                ];
            }

            $rows[$userId]['totalSales'] += (int) $controlNumber->amount;
            $target = $rows[$userId]['target'];
            $percentage = $target ? min(round(($rows[$userId]['totalSales'] / $target) * 100), 100) : 0;
            $rows[$userId]['dates'][$controlNumber->created_at->format('Y-m-d')] = $percentage;
        }

        $pdf = Pdf::loadView('pdf.target-report', [
            'title' => $title,
            'targetLabel' => 'Control Number Target',
            'dates' => $dates,
            'rows' => array_values($rows),
        ]);

        return $pdf->download($filename);
    }

}
