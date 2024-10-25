<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Taarifa\ReportController;
use App\Http\Controllers\Taarifa\TaarifaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth::routes([
//     'register' => false, // Disable the register route
// ]);


//collector & enforcer

Route::redirect('/register', '/login');

Route::middleware( ['auth','role:enforcer,collector'])->group(function () {
    Route::get('/', [TaarifaController::class, 'index'])->name('taarifa.index');
    Route::get('/ripoti', [ReportController::class, 'index'])->name('report.index');
    Route::post('/ripoti', [ReportController::class, 'store'])->name('report.store');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// admin

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/users', [AdminController::class, 'manageUsers'])->name('admin.users');
    Route::post('/admin/users', [AdminController::class, 'storeUser'])->name('admin.users.store');
    Route::get('/admin/reports', [ReportController::class, 'adminReports'])->name('admin.reports');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
});







require __DIR__.'/auth.php';
