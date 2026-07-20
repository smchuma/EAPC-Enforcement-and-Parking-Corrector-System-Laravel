<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\admin\AdminLoginController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Taarifa\ReportController;
use App\Http\Controllers\Taarifa\TaarifaController;
use App\Http\Controllers\Supervisor\SupervisorController;
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



Route::middleware( ['auth', 'agent'])->group(function () {

    Route::get('/', [TaarifaController::class, 'index'])->name('taarifa.index');
    Route::get('/ripoti', [ReportController::class, 'index'])->name('report.index');
    Route::post('/ripoti/mauzo', [ReportController::class, 'storeSales'])->name('report.store_sales');
    Route::post('/ripoti/control-number', [ReportController::class, 'storeControlNumbers'])->name('report.store_control_numbers');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// admin routes

Route::group(['prefix' => 'admin'], function() {

    Route::group(['middleware' => ['auth', 'admin']], function() {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/full-report', [ReportController::class, 'adminReports'])->name('admin.reports');
        Route::get('/full-report/pdf', [ReportController::class, 'adminReportsPdf'])->name('admin.reports_pdf');
        Route::get('/full-report/csv', [ReportController::class, 'adminReportsCsv'])->name('admin.reports_csv');

        //target reports
        Route::get('/target-reports', [ReportController::class, 'target_reports'])->name('admin.target_reports');
        Route::get('/target-reports/collector_daily_sales_report', [ReportController::class, 'collector_daily_sales_report'])->name('admin.collector_daily_sales_report');
        Route::get('/target-reports/collector_control_number_sales_report', [ReportController::class, 'collector_control_number_sales_report'])->name('admin.collector_control_number_sales_report');
        Route::get('/target-reports/enforcement_control_number_sales_report', [ReportController::class, 'enforcement_control_number_sales_report'])->name('admin.enforcement_control_number_sales_report');

        Route::get('/target-reports/collector_daily_sales_report/pdf', [ReportController::class, 'collector_daily_sales_report_pdf'])->name('admin.collector_daily_sales_report_pdf');
        Route::get('/target-reports/collector_control_number_sales_report/pdf', [ReportController::class, 'collector_control_number_sales_report_pdf'])->name('admin.collector_control_number_sales_report_pdf');
        Route::get('/target-reports/enforcement_control_number_sales_report/pdf', [ReportController::class, 'enforcement_control_number_sales_report_pdf'])->name('admin.enforcement_control_number_sales_report_pdf');

        Route::get('/users', [AdminController::class, 'viewUsers'])->name('admin.viewUsers');
        Route::post('/users/store', [AdminController::class, 'storeUser'])->name('admin.storeUser');
        Route::put('/user/update/{id}', [AdminController::class, 'update_user'])->name('admin.update_user');
        Route::delete('/user/delete/{id}', [AdminController::class, 'destroy_user'] )->name('admin.destroy_user');

        Route::get('/targets', [AdminController::class, 'viewTargets'])->name('admin.view_targets');
        Route::put('/targets/{id}', [AdminController::class, 'add_target'])->name('admin.add_target');

        Route::post('/logout', [AdminController::class, 'logout'])->name('admin.logout');

    });
});


// supervisor routes

Route::group(['prefix' => 'supervisor'], function() {
    Route::group(['middleware' => ['auth', 'supervisor']], function() {
        Route::get('/dashboard', [SupervisorController::class, 'dashboard'])->name('supervisor.dashboard');
        Route::get('/dashboard/pdf', [SupervisorController::class, 'reportsPdf'])->name('supervisor.reports_pdf');
        Route::get('/dashboard/csv', [SupervisorController::class, 'reportsCsv'])->name('supervisor.reports_csv');
    });
});









require __DIR__.'/auth.php';
