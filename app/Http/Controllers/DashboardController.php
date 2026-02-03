<?php

namespace App\Http\Controllers;

 
use App\Models\Staff;
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

    

    public function getKpis() { return response()->json(['total_sales' => 0, 'open_orders' => 0]); }
    public function getOrdersTrend() { return response()->json([]); }
    public function getRevenueMonthly() { return response()->json([]); }
    public function getTopServices() { return response()->json([]); }
    public function getTechnicianPerformance() { return response()->json([]); }
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
