<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\admin\AdminLoginController;
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



Route::middleware( ['auth', 'admin.redirect'])->group(function () {
    Route::get('/', [TaarifaController::class, 'index'])->name('taarifa.index');
    Route::get('/ripoti', [ReportController::class, 'index'])->name('report.index');
    Route::post('/ripoti', [ReportController::class, 'store'])->name('report.store');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// admin routes

Route::group(['prefix' => 'admin'], function() {

    Route::group(['middleware' => 'admin.guest'], function() {

        Route::get("/login", [AdminLoginController::class,"index"])->name("admin.login");
        Route::post('/login', [AdminLoginController:: class, 'authenticate'])->name('admin.authenticate');
    });

    Route::group(['middleware' => 'admin.auth'], function() {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/reports', [ReportController::class, 'adminReports'])->name('admin.reports');

        Route::get('/users', [AdminController::class, 'viewUsers'])->name('admin.viewUsers');
        Route::post('/users/store', [AdminController::class, 'storeUser'])->name('admin.storeUser');
        Route::put('/user/update/{id}', [AdminController::class, 'update_user'])->name('admin.update_user');
        Route::delete('/user/delete/{id}', [AdminController::class, 'destroy_user'] )->name('admin.destroy_user');

    });
});









require __DIR__.'/auth.php';
