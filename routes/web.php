<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Taarifa\TaarifaController;
use Illuminate\Foundation\Application;
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



//collector & enforcer

Route::middleware( ['auth','role:enforcer,collector'])->group(function () {
    Route::get('/', [TaarifaController::class, 'index'])->name('taarifa.index');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// admin

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/users', [AdminController::class, 'manageUsers'])->name('admin.users');
    Route::post('/admin/users', [AdminController::class, 'storeUser'])->name('admin.users.store');
});







require __DIR__.'/auth.php';
