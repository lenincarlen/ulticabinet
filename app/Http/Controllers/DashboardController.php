<?php

namespace App\Http\Controllers;

 

use App\Models\Customer;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display the dashboard
     */
    public function index()
    {
        return inertia('dashboard');
    }

    

    public function getKpis(Request $request) { 
        // Simple counts for now, can be filtered by date if needed
        $demoRequestsCount = \App\Models\DemoRequest::count();
        $customersCount = \App\Models\Customer::count();

        return response()->json([
            'demo_requests' => $demoRequestsCount,
            'customers' => $customersCount,
        ]); 
    }

    public function getAlerts() { 
        return response()->json([
            'unassigned_orders' => 0,
            'low_stock_products' => [],
            'overdue_invoices' => 0,
            'upcoming_appointments' => []
        ]); 
    }

    public function getTodayAppointments() { return response()->json([]); }
    public function getCashSummary() { return response()->json([]); }
}
