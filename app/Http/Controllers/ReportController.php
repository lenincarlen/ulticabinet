<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Invoice;
use Carbon\Carbon;

class ReportController extends Controller
{
    /**
     * Display the reports index page
     */
    public function index()
    {
        return Inertia::render('admin/reports/index');
    }

    /**
     * Get customer summary data
     */
    public function customerSummary(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth());
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth());

        $customers = Customer::whereBetween('created_at', [$startDate, $endDate])
            ->with(['invoices', 'quotes'])
            ->get();

        $summary = [
            'total_customers' => $customers->count(),
            'new_customers' => $customers->count(),
            'customers' => $customers->map(function ($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->nombre ?? $customer->name,
                    'apellido' => $customer->apellido ?? '',
                    'email' => $customer->email,
                    'phone' => $customer->telefono ?? $customer->phone,
                    'total_invoices' => $customer->invoices->count(),
                    'total_spent' => $customer->invoices->sum('total'),
                    'created_at' => $customer->created_at,
                ];
            }),
        ];

        return response()->json($summary);
    }

    /**
     * Get sales data
     */
    public function sales(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth());
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth());

        $invoices = Invoice::whereBetween('created_at', [$startDate, $endDate])
            ->with(['customer', 'lineItems'])
            ->get();

        $salesData = [
            'total_sales' => $invoices->sum('total'),
            'total_invoices' => $invoices->count(),
            'average_sale' => $invoices->count() > 0 ? $invoices->sum('total') / $invoices->count() : 0,
            'invoices' => $invoices->map(function ($invoice) {
                return [
                    'id' => $invoice->id,
                    'invoice_number' => $invoice->invoice_number,
                    'customer_name' => $invoice->customer->nombre ?? $invoice->customer->name ?? 'N/A',
                    'total' => $invoice->total,
                    'subtotal' => $invoice->subtotal,
                    'tax' => $invoice->tax,
                    'status' => $invoice->status,
                    'created_at' => $invoice->created_at,
                ];
            }),
        ];

        return response()->json($salesData);
    }

    /**
     * Export sales report as PDF
     */
    public function exportSalesPDF(Request $request)
    {
        // Implementar exportación PDF si es necesario
        return response()->json(['message' => 'PDF export not implemented yet']);
    }
}
