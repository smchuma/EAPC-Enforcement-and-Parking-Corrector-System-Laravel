<?php

namespace App\Http\Controllers\Taarifa;

use App\Http\Controllers\Controller;
use App\Models\ControlNumber;
use App\Models\Report;
use App\Models\User;
use App\Rules\ControlNumberUnique;
use App\Rules\UniqueDailyReport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
           "reports"=> $query->with("control_number")->orderByDesc('created_at')->paginate(5),
        ]);
    }

    public function store(Request $request) {

        $userId = $request->input('user_id') ?: Auth::id();

        $request->validate([
            'user_id' => [
                'nullable',
                'exists:users,id',
                new UniqueDailyReport($userId)  // Custom rule to check one report per day
            ],
            'daily_sales' => 'nullable|numeric',
            'control_numbers' => 'required|array',
            'control_numbers.*.number' => [
                'required',
                'regex:/^9986\d+$/',
                new ControlNumberUnique, // Use your custom rule here
            ],
            'control_numbers.*.amount' => 'required|numeric',
            'sales_proof_image' => 'nullable|image|max:2048',
        ], [
            'control_numbers.*.number.regex' => 'Mpangilio wa control number hauko sahihi',
    ]);


         $imagePath = null;
         if ($request->hasFile('sales_proof_image')) {
             $imagePath = $request->file('sales_proof_image')->store('sales_proof_images', 'public');
         }

           // Create the report
        $report = Report::create([
            'user_id' => $userId,
            'daily_sales' => $request->input('daily_sales'),
            'sales_proof_image' => $imagePath,
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


        return redirect()->back()->with('success', 'Report created successfully.');
    }


    public function adminReports(Request $request) {

        $query = Report::query();
        $users = User::get();

        if($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        return Inertia::render("Admin/Reports", [
           "reports"=> $query->with("control_number", "user")->orderByDesc('created_at')->paginate(5),
           "users" => $users
        ]);
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


}
