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

Route::get('/soluciones/{id}', function ($id) {
    // Definir soluciones estáticas idénticas a ProductShowcase.tsx
    $solutions = [
        [
            "id" => "tablero-multiplataforma",
            "name" => "Tablero Multiplataforma",
            "subtitle" => "Gestión de Expedientes",
            "description" => "Plataforma de Interoperabilidad General que permite la tramitación de casos y expedientes para la gestión, asignación, consulta y control visualización de los expedientes de acuerdo al nivel de seguridad del usuario.",
            "image_path" => "/images/soluciones/1.png"
        ],
        [
            "id" => "portal-transaccional",
            "name" => "Portal Transaccional",
            "subtitle" => "Solicitudes en Tiempo Real",
            "description" => "Portal que permite la creación de solicitudes en tiempo real para la validación por parte de la institución con capacidad para adaptarse y personalizarse utilizando plantillas.",
            "image_path" => "/images/soluciones/2.png"
        ],
        [
            "id" => "inteligencia-negocios",
            "name" => "Inteligencia de Negocios",
            "subtitle" => "Tableros de Control",
            "description" => "Herramienta para la visualización de estadísticas en tiempo real de los casos y procesos para estimar y determinar el comportamiento utilizando tableros de control.",
            "image_path" => "/images/soluciones/3.png"
        ],
        [
            "id" => "control-accesos",
            "name" => "Control de Accesos",
            "subtitle" => "Seguridad Institucional",
            "description" => "Sistemas de control para determinar si una persona cumple con los requisitos establecidos por la organización para permitir el ingreso, enlazando en tiempo real con entidades.",
            "image_path" => "/images/soluciones/4.png"
        ],
        [
            "id" => "compras-licitaciones",
            "name" => "Compras y Licitaciones",
            "subtitle" => "Gestión de Proveedores",
            "description" => "Plataforma de compras con interoperabilidad para clientes y suplidores por rubros, consolidación de propuestas y depuración de oferentes.",
            "image_path" => "/images/soluciones/5.png"
        ],
        [
            "id" => "modulador-flujos",
            "name" => "Modulador de Flujos",
            "subtitle" => "BPM Visual",
            "description" => "Modulador de flujos de manera visual con capacidad de creación de dependencias, requisitos, gestiones, asignaciones y reglas de negocio.",
            "image_path" => "/images/soluciones/6.png"
        ],
        [
            "id" => "chat-linea",
            "name" => "Chat en Línea",
            "subtitle" => "Soporte en Vivo",
            "description" => "Sistema de chat en línea con operadores y representantes, con capacidad de cargar imágenes y reportar inconvenientes en línea como parte de la experiencia.",
            "image_path" => "/images/soluciones/7.png"
        ],
        [
            "id" => "notificaciones",
            "name" => "Sistema de Notificaciones",
            "subtitle" => "Comunicación Transversal",
            "description" => "Envío de notificaciones y correos transversales a clientes y empleados, incluyendo avisos omnicanales sobre el cambio de estado en las solicitudes.",
            "image_path" => "/images/soluciones/8.png"
        ],
        [
            "id" => "seguimiento-casos",
            "name" => "Seguimiento de Casos",
            "subtitle" => "Control de Mensajería",
            "description" => "Sistema de seguimiento de casos y correspondencias que permite tomar fotos y cambiar estados automáticamente, con geolocalización para el control de mensajeros.",
            "image_path" => "/images/soluciones/9.png"
        ],
        [
            "id" => "carga-descarga",
            "name" => "Sistema de Carga y Descarga",
            "subtitle" => "Automatización",
            "description" => "Sistema de carga automatizado y desatendido que replica el funcionamiento humano, con reconocimiento automático de documentos basado en perfiles de indexación inteligente.",
            "image_path" => "/images/soluciones/10.png"
        ],
        [
            "id" => "consulta-telefonica",
            "name" => "Aplicación Telefónica",
            "subtitle" => "Consulta y Asistencia",
            "description" => "Aplicación de consulta y asistencia al usuario mediante llamadas telefónicas a la central, con reenvío inteligente a personal de soporte.",
            "image_path" => "/images/soluciones/11.png"
        ],
        [
            "id" => "repositorio-digital",
            "name" => "Repositorio Digital",
            "subtitle" => "Almacenamiento Seguro",
            "description" => "Data Warehouse y repositorio central de documentos que funciona On Premise y en la nube, con sistema de almacenamiento y digitalización.",
            "image_path" => "/images/soluciones/12.png"
        ],
        [
            "id" => "gestor-multimedia",
            "name" => "Gestor Multimedia",
            "subtitle" => "Contenido Digital",
            "description" => "Servicio de carga y reproducción de contenido multimedia (fotos, videos, audios) y gestión de carga y descarga sin límite de espacio.",
            "image_path" => "/images/soluciones/13.png"
        ],
        [
            "id" => "mensajeria-inmediata",
            "name" => "Mensajería Inmediata",
            "subtitle" => "Alta Importancia",
            "description" => "Sistema de mensajería instantánea para casos de alta importancia, permitiendo el envío y distribución de notas automatizadas basadas en el expediente.",
            "image_path" => "/images/soluciones/14.png"
        ],
        [
            "id" => "impresora-virtual",
            "name" => "Impresora Virtual",
            "subtitle" => "Ecología Digital",
            "description" => "Impresora Virtual instalable para eliminar el consumo de papel y generar documentos electrónicos que se cargan automáticamente al repositorio.",
            "image_path" => "/images/soluciones/15.png"
        ],
        [
            "id" => "firma-digital",
            "name" => "Firma Digital",
            "subtitle" => "Seguridad Electrónica",
            "description" => "Sistema de firma digital electrónica para reemplazar rúbricas físicas, complementado con una bóveda de seguridad que requiere token de acceso.",
            "image_path" => "/images/soluciones/16.png"
        ],
        [
            "id" => "digitalizacion-masiva",
            "name" => "Digitalización Masiva",
            "subtitle" => "Proyectos Llave en Mano",
            "description" => "Sistema para digitalización masiva de documentos con entrega de proyectos llave en mano o entrenamiento a usuarios.",
            "image_path" => "/images/soluciones/17.png"
        ],
        [
            "id" => "repositorio-institucional",
            "name" => "Repositorio Institucional",
            "subtitle" => "Archivo Digital",
            "description" => "Repositorio, depósito o archivo donde se almacenan, distribuyen y mantienen la información digital de la institución.",
            "image_path" => "/images/soluciones/18.png"
        ],
        [
            "id" => "universidad-linea",
            "name" => "Universidad en Línea",
            "subtitle" => "E-Learning",
            "description" => "Sistema para que alumnos y docentes puedan conectarse en un entorno virtual para un aprendizaje colaborativo y flexible.",
            "image_path" => "/images/soluciones/19.png"
        ]
    ];

    $solution = collect($solutions)->firstWhere('id', $id);

    if (!$solution) {
        abort(404);
    }

    return Inertia::render('solutions/show', [
        'solution' => $solution
    ]);
})->name('solutions.show');

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
