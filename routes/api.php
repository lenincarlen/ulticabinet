<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api')->middleware(['web', 'auth'])->group(function () {
    // Rutas de recursos para los controladores generados
    Route::resource('app-states', \App\Http\Controllers\AppStateController::class);
    // Route::resource('bank-accounts', \App\Http\Controllers\BankAccountController::class);
    // Route::resource('calendars', \App\Http\Controllers\CalendarController::class);
    Route::resource('company-infos', \App\Http\Controllers\CompanyInfoController::class);
    Route::resource('customers', \App\Http\Controllers\Admin\CustomerController::class);
    // Route::resource('invoices', \App\Http\Controllers\InvoiceController::class);
    // Route::resource('invoice-line-items', \App\Http\Controllers\InvoiceLineItemController::class);
    // Route::resource('maintenance-schedules', \App\Http\Controllers\MaintenanceScheduleController::class);
    // Route::resource('payment-details', \App\Http\Controllers\PaymentDetailsController::class);
    // Route::resource('products', \App\Http\Controllers\ProductController::class);
    Route::resource('quotes', \App\Http\Controllers\QuoteController::class);
    Route::resource('staff', \App\Http\Controllers\StaffController::class);
    Route::resource('users', \App\Http\Controllers\UserController::class);
    Route::resource('workshop-equipments', \App\Http\Controllers\WorkshopEquipmentController::class);
    
    // Ruta para búsqueda de clientes (autocomplete)
    Route::get('customers/search', [\App\Http\Controllers\Admin\CustomerController::class, 'search'])->name('customers.search');
    
    // Ruta para procesar ventas POS
    // Route::post('cash-register/process-sale', [\App\Http\Controllers\CashRegisterController::class, 'processSale'])->name('cash-register.process-sale');
    
    // Rutas para historial de ventas de la sesión
    // Route::get('cash-register/session-sales', [\App\Http\Controllers\CashRegisterController::class, 'getSessionSales'])->name('cash-register.session-sales');
    
    // Rutas para borradores del POS
    Route::get('cash-register/drafts', [\App\Http\Controllers\Api\PosDraftController::class, 'index'])->name('cash-register.drafts.index');
    Route::post('cash-register/drafts', [\App\Http\Controllers\Api\PosDraftController::class, 'store'])->name('cash-register.drafts.store');
    Route::get('cash-register/drafts/{id}', [\App\Http\Controllers\Api\PosDraftController::class, 'show'])->name('cash-register.drafts.show');
    Route::delete('cash-register/drafts/{id}', [\App\Http\Controllers\Api\PosDraftController::class, 'destroy'])->name('cash-register.drafts.destroy');
});