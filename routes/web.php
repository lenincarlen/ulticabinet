<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $solutions = \App\Models\Solution::active()->ordered()->get();
    
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'solutions' => $solutions,
        'siteSettings' => \App\Models\SiteSetting::getAll(),
    ]);
})->name('home');

Route::get('/nosotros', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/soluciones', function () {
    return Inertia::render('solutions');
})->name('solutions');

Route::get('/soluciones/all', function () {
    return Inertia::render('solutions/all');
})->name('solutions.all');

// Public demo request routes
Route::get('/solicitar-demo', [\App\Http\Controllers\DemoRequestController::class, 'create'])->name('demo.create');
Route::post('/solicitar-demo', [\App\Http\Controllers\DemoRequestController::class, 'store'])->name('demo.store');
Route::get('/demo-gracias/{request}', [\App\Http\Controllers\DemoRequestController::class, 'thanks'])->name('demo.thanks');

// Blog Routes
Route::get('/blog', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    
    // Dashboard API routes
    Route::prefix('api/dashboard')->group(function () {
        Route::get('kpis', [\App\Http\Controllers\DashboardController::class, 'getKpis']);
        Route::get('orders-trend', [\App\Http\Controllers\DashboardController::class, 'getOrdersTrend']);
        Route::get('revenue-monthly', [\App\Http\Controllers\DashboardController::class, 'getRevenueMonthly']);
        Route::get('top-services', [\App\Http\Controllers\DashboardController::class, 'getTopServices']);
        Route::get('technician-performance', [\App\Http\Controllers\DashboardController::class, 'getTechnicianPerformance']);
        Route::get('alerts', [\App\Http\Controllers\DashboardController::class, 'getAlerts']);
        Route::get('today-appointments', [\App\Http\Controllers\DashboardController::class, 'getTodayAppointments']);
        Route::get('cash-summary', [\App\Http\Controllers\DashboardController::class, 'getCashSummary']);
    });

    Route::get('my-orders', function () {
        return Inertia::render('MyOrdersView');
    })->name('my-orders');

    Route::get('unconfirmed-appointments', function () {
        return Inertia::render('admin/UnconfirmedAppointmentsView');
    })->name('unconfirmed-appointments');

   
    
    Route::get('maintenance-schedules', function () {
        return Inertia::render('MaintenanceManagement');
    })->name('maintenance-schedules');

    Route::resource('admin/customers', \App\Http\Controllers\Admin\CustomerController::class);

    Route::get('customer-map', function () {
        return Inertia::render('CustomerMapView');
    })->name('customer-map');

    // Rutas solo para admin y operador
    Route::middleware(['role:admin,operador'])->prefix('admin')->group(function () {
        Route::resource('staff', \App\Http\Controllers\StaffController::class);
        Route::resource('services', \App\Http\Controllers\ServiceController::class);
        
        // Ruta de compatibilidad para StaffManagement
        Route::get('staff-management', function () {
            return redirect()->route('staff.index');
        })->name('staff-management');
    });

    // Rutas solo para admin
    // Rutas solo para admin
    Route::middleware(['role:admin'])->prefix('admin')->group(function () {
        Route::resource('users', \App\Http\Controllers\UserController::class);
        Route::resource('posts', \App\Http\Controllers\Admin\PostController::class, [
            'as' => 'admin' // Prefixes route names with 'admin.' -> admin.posts.index
        ]);
    });

    Route::resource('admin/technicians', \App\Http\Controllers\TechnicianController::class);



    // Rutas de inventario - Solo admin
    Route::middleware(['role:admin'])->group(function () {
        Route::get('inventario', [\App\Http\Controllers\InventoryController::class, 'index'])->name('inventory.index');
        Route::resource('inventario/productos', \App\Http\Controllers\InventoryProductController::class)->names([
            'index' => 'inventory.products.index',
            'create' => 'inventory.products.create',
            'store' => 'inventory.products.store',
            'show' => 'inventory.products.show',
            'edit' => 'inventory.products.edit',
            'update' => 'inventory.products.update',
            'destroy' => 'inventory.products.destroy',
        ]);
        
       
    });
    
 
   

    
    // Rutas de reportes - Solo admin y operador
    Route::middleware(['role:admin,operador'])->prefix('reportes')->group(function () {
        Route::get('/', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
        Route::get('/ventas', fn() => inertia('admin/reports/sales'))->name('reports.sales.page');
        Route::get('/inventario', fn() => inertia('admin/reports/inventory'))->name('reports.inventory.page');
        Route::get('/caja', [\App\Http\Controllers\ReportController::class, 'cashRegisterPage'])->name('reports.cash-register.page');
        Route::get('/tecnicos', fn() => inertia('admin/reports/technicians'))->name('reports.technicians.page');
        Route::get('/clientes', fn() => inertia('admin/reports/customers'))->name('reports.customers.page');
        Route::get('/ingresos', [\App\Http\Controllers\ReportController::class, 'income'])->name('reports.income');
        
        // Export routes
        Route::get('/ventas/export-pdf', [\App\Http\Controllers\ReportController::class, 'exportSalesPDF'])->name('reports.sales.export-pdf');
        Route::get('/inventario/export-pdf', [\App\Http\Controllers\ReportController::class, 'exportInventoryPDF'])->name('reports.inventory.export-pdf');
        Route::get('/caja/export-pdf', [\App\Http\Controllers\ReportController::class, 'exportCashRegisterPDF'])->name('reports.cash-register.export-pdf');
        
        // API routes
        Route::get('/api/ventas', [\App\Http\Controllers\ReportController::class, 'sales'])->name('reports.sales');
        Route::get('/api/ventas-por-servicio', [\App\Http\Controllers\ReportController::class, 'salesByService'])->name('reports.sales-by-service');
        Route::get('/api/ventas-por-metodo-pago', [\App\Http\Controllers\ReportController::class, 'salesByPaymentMethod'])->name('reports.sales-by-payment');
        Route::get('/api/inventario-estado', [\App\Http\Controllers\ReportController::class, 'inventoryStockStatus'])->name('reports.inventory-status');
        Route::get('/api/sesiones-caja', [\App\Http\Controllers\ReportController::class, 'cashRegisterSessions'])->name('reports.cash-sessions');
        Route::get('/api/rendimiento-tecnicos', [\App\Http\Controllers\ReportController::class, 'technicianPerformance'])->name('reports.technician-performance');
        Route::get('/api/comisiones-ventas', [\App\Http\Controllers\ReportController::class, 'commissionSales'])->name('reports.commission-sales');
        Route::get('/api/staff', [\App\Http\Controllers\ReportController::class, 'getAllStaff'])->name('reports.staff');
        Route::get('/api/resumen-clientes', [\App\Http\Controllers\ReportController::class, 'customerSummary'])->name('reports.customer-summary');
    });
    

    /*
    // Rutas de reportes DGII
    Route::prefix('dgii')->group(function () {
        Route::get('/', [\App\Http\Controllers\DgiiReportController::class, 'index'])->name('dgii.index');
        Route::post('/607', [\App\Http\Controllers\DgiiReportController::class, 'generate607'])->name('dgii.607');
        Route::post('/606', [\App\Http\Controllers\DgiiReportController::class, 'generate606'])->name('dgii.606');
    });
    */
    
    Route::post('invoices/{invoice}/mark-as-paid', [\App\Http\Controllers\InvoiceController::class, 'markAsPaid'])->name('invoices.mark-as-paid');
    Route::put('invoices/{invoice}/cancel', [\App\Http\Controllers\InvoiceController::class, 'cancel'])->name('invoices.cancel');
    Route::post('invoices/{invoice}/send-email', [\App\Http\Controllers\InvoiceController::class, 'sendByEmail'])->name('invoices.send-email');
    
    /*
    // Rutas de NCF
    Route::prefix('ncf')->group(function () {
        Route::get('/', [\App\Http\Controllers\NcfController::class, 'index'])->name('ncf.index');
        Route::get('/create', [\App\Http\Controllers\NcfController::class, 'create'])->name('ncf.create');
        Route::post('/', [\App\Http\Controllers\NcfController::class, 'store'])->name('ncf.store');
        Route::put('/{ncf}', [\App\Http\Controllers\NcfController::class, 'update'])->name('ncf.update');
        Route::get('/status', [\App\Http\Controllers\NcfController::class, 'status'])->name('ncf.status');
    });
    */

    // API Routes for customer search
    Route::get('/api/customers/search', [\App\Http\Controllers\Admin\CustomerController::class, 'search'])->name('api.customers.search');
    
    // Rutas POS (Punto de Venta - Caja Dedicada) - Solo vendedor y admin
    Route::middleware(['role:vendedor,admin'])->prefix('pos')->group(function () {
        Route::get('/', [\App\Http\Controllers\CashRegisterController::class, 'pos'])->name('pos.index');
    });
    
    
    // Rutas de configuración del sitio - Solo admin
    Route::middleware(['role:admin'])->prefix('admin/configuracion')->group(function () {
        Route::get('/sitio', [\App\Http\Controllers\SiteSettingController::class, 'index'])->name('settings.site');
        Route::post('/sitio', [\App\Http\Controllers\SiteSettingController::class, 'update'])->name('settings.site.update');
        Route::post('/sitio/upload/{key}', [\App\Http\Controllers\SiteSettingController::class, 'uploadImage'])->name('settings.site.upload');
    });
    
    // API para obtener configuraciones (público para landing)
    Route::get('/api/settings', [\App\Http\Controllers\SiteSettingController::class, 'getSettings'])->name('api.settings');
    Route::get('/api/settings/{group}', [\App\Http\Controllers\SiteSettingController::class, 'getByGroup'])->name('api.settings.group');
    
    // Admin demo request routes - Only admin and operador
    Route::middleware(['role:admin,operador'])->prefix('admin/demo-requests')->group(function () {
        Route::get('/', [\App\Http\Controllers\Admin\DemoRequestController::class, 'index'])->name('admin.demo-requests.index');
        Route::get('/{id}', [\App\Http\Controllers\Admin\DemoRequestController::class, 'show'])->name('admin.demo-requests.show');
        Route::put('/{id}', [\App\Http\Controllers\Admin\DemoRequestController::class, 'update'])->name('admin.demo-requests.update');
        Route::post('/{id}/assign', [\App\Http\Controllers\Admin\DemoRequestController::class, 'assign'])->name('admin.demo-requests.assign');
        Route::post('/{id}/schedule', [\App\Http\Controllers\Admin\DemoRequestController::class, 'schedule'])->name('admin.demo-requests.schedule');
        Route::get('/export/data', [\App\Http\Controllers\Admin\DemoRequestController::class, 'export'])->name('admin.demo-requests.export');
        Route::get('/api/stats', [\App\Http\Controllers\Admin\DemoRequestController::class, 'stats'])->name('admin.demo-requests.stats');
    });

    // Admin solutions management
    Route::middleware(['role:admin'])->prefix('admin/solutions')->group(function () {
        Route::get('/', [\App\Http\Controllers\Admin\SolutionController::class, 'index'])->name('admin.solutions.index');
        Route::get('/create', [\App\Http\Controllers\Admin\SolutionController::class, 'create'])->name('admin.solutions.create');
        Route::post('/', [\App\Http\Controllers\Admin\SolutionController::class, 'store'])->name('admin.solutions.store');
        Route::get('/{solution}/edit', [\App\Http\Controllers\Admin\SolutionController::class, 'edit'])->name('admin.solutions.edit');
        Route::post('/{solution}', [\App\Http\Controllers\Admin\SolutionController::class, 'update'])->name('admin.solutions.update'); // Using POST with _method PUT for file upload support in Inertia
        Route::delete('/{solution}', [\App\Http\Controllers\Admin\SolutionController::class, 'destroy'])->name('admin.solutions.destroy');
    });
    
    // Rutas de nómina
    Route::resource('admin/payroll', \App\Http\Controllers\PayrollController::class);
    Route::post('admin/payroll/{payroll}/process', [\App\Http\Controllers\PayrollController::class, 'process'])->name('payroll.process');
});

require __DIR__.'/settings.php';
require __DIR__.'/api.php';
