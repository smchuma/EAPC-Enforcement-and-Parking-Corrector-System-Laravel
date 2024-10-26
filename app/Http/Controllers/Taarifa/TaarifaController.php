<?php

namespace App\Http\Controllers\Taarifa;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaarifaController extends Controller
{
    //
    public function index() {

        $reports = Report::where('user_id', Auth::id());

        return Inertia::render("Taarifa/Home", [
            "reports" => $reports->with('control_number')->get()
        ]);
    }
}
