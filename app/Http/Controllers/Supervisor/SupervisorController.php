<?php

namespace App\Http\Controllers\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SupervisorController extends Controller
{
    public function dashboard(Request $request)
    {
        $query = Report::where('supervisor_id', Auth::id());

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->whereDate('created_at', $search);
        }

        return Inertia::render("Supervisor/Dashboard", [
            "reports" => $query->with(['control_number', 'user'])->orderByDesc('created_at')->paginate(5),
        ]);
    }
}
