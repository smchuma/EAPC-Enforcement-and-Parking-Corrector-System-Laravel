<?php

namespace App\Http\Controllers\Taarifa;

use App\Http\Controllers\Controller;
use App\Models\ControlNumber;
use App\Models\Report;
use App\Models\User;
use App\Rules\ControlNumberUnique;
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

        $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'daily_sales' => 'nullable|numeric',
            'control_numbers' => 'required|array',
            'control_numbers.*.number' => [
                'required',
                'regex:/^9986\d{9}$/',
                new ControlNumberUnique, // Use your custom rule here
            ],
            'control_numbers.*.amount' => 'required|numeric',
            'sales_proof_image' => 'nullable|image|max:2048',
        ], [
            'control_numbers.*.number.regex' => 'Mpangilio wa control number hauko sahihi',
    ]);

        $userId = $request->input('user_id') ?: Auth::id();


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

    public function target_report(Request $request) {

        $query = Report::query();
        $users = User::get();

        if($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        return Inertia::render("Admin/TargetReport", [
           "reports"=> $query->with("control_number", "user")->orderByDesc('created_at')->paginate(5),
           "users" => $users
        ]);
    }


}
