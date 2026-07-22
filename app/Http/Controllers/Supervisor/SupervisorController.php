<?php

namespace App\Http\Controllers\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class SupervisorController extends Controller
{
    public function dashboard(Request $request)
    {
        $query = Report::where('supervisor_id', Auth::id());

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        $reports = $query->with(['control_number', 'user'])->orderBy('created_at')->get();

        return Inertia::render("Supervisor/Dashboard", [
            "reports" => $this->groupReportsByUserAndDate($reports),
        ]);
    }

    // Temporary: supervisors can register users too, for now (will be
    // removed later). Reuses AdminController's storeUser/update_user/
    // destroy_user/sendInvitation for the actual mutations.
    public function viewUsers(Request $request)
    {
        $query = User::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('first_name', 'LIKE', "%{$search}%");
        }

        return Inertia::render("Supervisor/Users", [
            "users" => $query->orderByDesc('created_at')->paginate(10)->withQueryString(),
        ]);
    }

    public function reportsPdf(Request $request)
    {
        $request->validate([
            'from' => 'required|date',
            'to' => 'required|date|after_or_equal:from',
        ]);

        $from = Carbon::parse($request->input('from'))->startOfDay();
        $to = Carbon::parse($request->input('to'))->endOfDay();

        $reports = Report::where('supervisor_id', Auth::id())
            ->whereBetween('created_at', [$from, $to])
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
            'title' => 'Ripoti Ninazosimamia',
            'from' => $from->format('Y-m-d'),
            'to' => $to->format('Y-m-d'),
            'rows' => $rows,
            'totals' => $totals,
        ]);

        return $pdf->download("SupervisedReports_{$from->format('Y-m-d')}_to_{$to->format('Y-m-d')}.pdf");
    }

    public function reportsCsv(Request $request)
    {
        $request->validate([
            'from' => 'required|date',
            'to' => 'required|date|after_or_equal:from',
        ]);

        $from = Carbon::parse($request->input('from'))->startOfDay();
        $to = Carbon::parse($request->input('to'))->endOfDay();

        $reports = Report::where('supervisor_id', Auth::id())
            ->whereBetween('created_at', [$from, $to])
            ->with(['control_number', 'user'])
            ->orderBy('created_at')
            ->get();

        $rows = $this->groupReportsByUserAndDate($reports);

        $filename = "SupervisedReports_{$from->format('Y-m-d')}_to_{$to->format('Y-m-d')}.csv";

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
}
