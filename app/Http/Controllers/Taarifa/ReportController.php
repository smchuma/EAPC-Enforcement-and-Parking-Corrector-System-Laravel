<?php

namespace App\Http\Controllers\Taarifa;

use App\Http\Controllers\Controller;
use App\Models\ControlNumber;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReportController extends Controller
{
    //

    public function index() {
        return Inertia::render("Taarifa/Ripoti");
    }

    public function store(Request $request) {

        $request->validate([
            'daily_sales' => 'nullable|numeric',
            'control_numbers' => 'required|array',
            'control_numbers.*.number' =>  'required|regex:/^9986\d{8}$/|unique:control_numbers,control_number',
            'control_numbers.*.amount' => 'required|numeric',
            'sales_proof_image' => 'nullable|image|max:2048',

        ]);

         // Handle image upload (only if daily sales is entered, i.e., for collectors)
         $imagePath = null;
         if ($request->hasFile('sales_proof_image')) {
             $imagePath = $request->file('sales_proof_image')->store('sales_proof_images', 'public');
         }

           // Create the report
        $report = Report::create([
            'user_id' => Auth::id(),
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


        return redirect()->route('reports.index')->with('success', 'Report created successfully.');
    }
}
