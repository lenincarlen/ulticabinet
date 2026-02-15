<?php

namespace App\Http\Controllers;

use App\Models\DemoRequest;
use App\Models\User;
use App\Notifications\NewDemoRequestNotification;
use App\Notifications\DemoRequestConfirmationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class DemoRequestController extends Controller
{
    /**
     * Display the demo request form
     */
    public function create()
    {
        return Inertia::render('demo-request');
    }

    /**
     * Store a new demo request
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
          
            'company_name' => 'required|string|max:255',
            'contact_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'required|string|max:20',
            'company_size' => 'nullable|string|in:1-10,11-50,51-200,201-500,500+',
            'industry' => 'nullable|string|max:100',
            'current_solution' => 'nullable|string|max:255',
            'pain_points' => 'nullable|array',
            'pain_points.*' => 'string|max:500',
            'preferred_date' => 'nullable|date|after:today',
            'preferred_time' => 'nullable|string|in:morning,afternoon,evening',
            'timezone' => 'nullable|string|max:50',
            'demo_format' => 'nullable|string|in:online,in-person,phone',
            'additional_notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validated();

        // Generate unique request number
        $validated['request_number'] = DemoRequest::generateRequestNumber();
        
        // Set initial status
        $validated['status'] = 'pending';
        
        // Capture UTM parameters and tracking data
        $validated['utm_source'] = $request->input('utm_source');
        $validated['utm_medium'] = $request->input('utm_medium');
        $validated['utm_campaign'] = $request->input('utm_campaign');
        $validated['referrer_url'] = $request->header('referer');
        $validated['ip_address'] = $request->ip();
        $validated['user_agent'] = $request->userAgent();

        // Create the demo request
        $demoRequest = DemoRequest::create($validated);

        // Create initial status history
        $demoRequest->statusHistory()->create([
            'old_status' => null,
            'new_status' => 'pending',
            'changed_by_id' => null,
            'notes' => 'Demo request created from website',
        ]);

        // Send notification to admins
        $admins = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->get();

        foreach ($admins as $admin) {
            $admin->notify(new NewDemoRequestNotification($demoRequest));
        }

        // Send confirmation email to customer
        Notification::route('mail', $demoRequest->contact_email)
            ->notify(new DemoRequestConfirmationNotification($demoRequest));

        return redirect()->route('demo.thanks', ['request' => $demoRequest->request_number])
            ->with('success', '¡Gracias! Tu solicitud de demo ha sido recibida. Te contactaremos pronto.');
    }

    /**
     * Display thank you page
     */
    public function thanks($requestNumber)
    {
        $demoRequest = DemoRequest::where('request_number', $requestNumber)
            ->firstOrFail();

        return Inertia::render('demo-gracias', [
            'demoRequest' => $demoRequest,
        ]);
    }
}
