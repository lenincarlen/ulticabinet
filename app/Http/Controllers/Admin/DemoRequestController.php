<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DemoRequest;
// use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class DemoRequestController extends Controller
{
    /**
     * Display a listing of demo requests
     */
    public function index(Request $request)
    {
        $query = DemoRequest::query()
            ->orderBy('created_at', 'desc');

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by solution


        // Filter by assigned staff (REMOVED)
        // if ($request->has('assigned_to') && $request->assigned_to) {
        //    $query->where('assigned_to', $request->assigned_to);
        // }

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('request_number', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('contact_name', 'like', "%{$search}%")
                  ->orWhere('contact_email', 'like', "%{$search}%")
                  ->orWhere('contact_phone', 'like', "%{$search}%");
            });
        }

        $demoRequests = $query->paginate(15);

        // Get filters data

        // $staff = Staff::where('is_active', true)->get(['id', 'name']);

        // Get statistics
        $stats = [
            'total' => DemoRequest::count(),
            'pending' => DemoRequest::where('status', 'pending')->count(),
            'confirmed' => DemoRequest::where('status', 'confirmed')->count(),
            'completed' => DemoRequest::where('status', 'completed')->count(),
            'cancelled' => DemoRequest::where('status', 'cancelled')->count(),
        ];

        return Inertia::render('admin/demo-requests/index', [
            'demoRequests' => $demoRequests,
            'stats' => $stats,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    /**
     * Display the specified demo request
     */
    public function show($id)
    {
        $demoRequest = DemoRequest::with([
            'statusHistory' // .changedByStaff removed
        ])->findOrFail($id);

        return Inertia::render('admin/demo-requests/show', [
            'demoRequest' => $demoRequest,
            'staff' => [], // Empty array
        ]);
    }

    /**
     * Update the specified demo request
     */
    public function update(Request $request, $id)
    {
        $demoRequest = DemoRequest::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'sometimes|string|in:pending,new,confirmed,in_progress,completed,cancelled,no_show,quoted,for_preview,previewed,sold',
            // 'assigned_to' => 'nullable|exists:staff,id',
            'scheduled_at' => 'nullable|date',
            'demo_notes' => 'nullable|string|max:2000',
            'follow_up_date' => 'nullable|date',
            'conversion_probability' => 'nullable|integer|min:0|max:100',
            'estimated_value' => 'nullable|numeric|min:0',
            'cancellation_reason' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $validated = $validator->validated();
        $oldStatus = $demoRequest->status;

        // Handle status change
        if (isset($validated['status']) && $validated['status'] !== $oldStatus) {
            $newStatus = $validated['status'];
            
            // Set timestamps based on status
            if (in_array($newStatus, ['completed', 'sold'])) {
                $validated['completed_at'] = now();
            } elseif ($newStatus === 'cancelled') {
                $validated['cancelled_at'] = now();
            }

            // Create status history
            $demoRequest->statusHistory()->create([
                'old_status' => $oldStatus,
                'new_status' => $newStatus,
                'changed_by_id' => Auth::id(), // Use Auth::id() instead of staff id
                'notes' => $request->input('status_notes'),
            ]);

            // Notify customer on significant status changes
            if (in_array($newStatus, ['confirmed', 'completed', 'cancelled', 'sold'])) {
                // We could create specific notifications for each status
                // For now, we'll re-use the confirmation one for confirmed
                if ($newStatus === 'confirmed') {
                    \Illuminate\Support\Facades\Notification::route('mail', $demoRequest->contact_email)
                        ->notify(new \App\Notifications\DemoRequestConfirmationNotification($demoRequest));
                }
            }
        }

        $demoRequest->update($validated);

        return back()->with('success', 'Demo request updated successfully');
    }

    /**
     * Assign demo request to staff
     */
    /*
     * Assign demo request to staff (REMOVED)
     */
    public function assign(Request $request, $id)
    {
        return back()->with('error', 'Staff assignment is disabled.');
    }

    /**
     * Schedule a demo
     */
    public function schedule(Request $request, $id)
    {
        $demoRequest = DemoRequest::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'scheduled_at' => 'required|date|after:now',
            // 'assigned_to' => 'required|exists:staff,id',
            'notes' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $oldStatus = $demoRequest->status;
        
        $demoRequest->update([
            'scheduled_at' => $request->scheduled_at,
            // 'assigned_to' => $request->assigned_to,
            'status' => 'confirmed',
        ]);

        // Create status history if status changed
        if ($oldStatus !== 'confirmed') {
            $demoRequest->statusHistory()->create([
                'old_status' => $oldStatus,
                'new_status' => 'confirmed',
                'changed_by_id' => Auth::id(),
                'notes' => $request->notes ?? 'Demo scheduled for ' . $request->scheduled_at,
            ]);
        }

        // Notify customer
        \Illuminate\Support\Facades\Notification::route('mail', $demoRequest->contact_email)
            ->notify(new \App\Notifications\DemoRequestConfirmationNotification($demoRequest));

        return back()->with('success', 'Demo scheduled successfully');
    }

    /**
     * Export demo requests
     */
    public function export(Request $request)
    {
        $query = DemoRequest::query();

        // Apply same filters as index
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }



        // if ($request->has('assigned_to') && $request->assigned_to) {
        //    $query->where('assigned_to', $request->assigned_to);
        // }

        $demoRequests = $query->get();

        // TODO: Implement CSV/Excel export
        // For now, return JSON
        return response()->json($demoRequests);
    }

    /**
     * Get statistics for dashboard
     */
    public function stats()
    {
        $stats = [
            'total' => DemoRequest::count(),
            'pending' => DemoRequest::whereIn('status', ['pending', 'new'])->count(),
            'quoted' => DemoRequest::where('status', 'quoted')->count(),
            'for_preview' => DemoRequest::where('status', 'for_preview')->count(),
            'previewed' => DemoRequest::where('status', 'previewed')->count(),
            'sold' => DemoRequest::whereIn('status', ['sold', 'completed'])->count(),
            'cancelled' => DemoRequest::whereIn('status', ['cancelled', 'lost'])->count(),
            
            // This month stats
            'this_month' => DemoRequest::whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count(),
            
            // Conversion rate (sold / total)
            'conversion_rate' => DemoRequest::count() > 0 
                ? round((DemoRequest::whereIn('status', ['sold', 'completed'])->count() / DemoRequest::count()) * 100, 2)
                : 0,
        ];

        return response()->json($stats);
    }
}
