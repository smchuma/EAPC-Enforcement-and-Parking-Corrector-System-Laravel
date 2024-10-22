<?php

namespace App\Http\Controllers\Taarifa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaarifaController extends Controller
{
    //
    public function index() {
        return Inertia::render("Taarifa/Home");
    }
}
