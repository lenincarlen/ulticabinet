<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of customers.
     */
    public function index()
    {
        $customers = Customer::with([
            'createdBy', // Now belongs to User
            // 'accountManager', // Removed as it relied on Start
        ])
            ->orderBy('created_at', 'desc')
            ->get();

        // Obtener lista de staff para account manager (REMOVED)
        // $staff = \App\Models\Staff::where('active', true)
        //    ->orderBy('name')
        //    ->select('id', 'name', 'email')
        //    ->get();

        return Inertia::render('admin/customers/index', [
            'customers' => $customers,
            'staff' => [], // Empty array
        ]);
    }

    /**
     * Show the form for creating a new customer.
     */
    public function create()
    {
        return Inertia::render('admin/customers/create');
    }

    /**
     * Store a newly created customer.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'nullable|string|max:255',
            'cedula' => 'nullable|string|max:50|unique:customers,cedula',
            'telefono' => 'required|string|max:20',
            'email' => 'nullable|email|max:255|unique:customers,email',
            'address' => 'nullable|string|max:500',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        // Obtener el usuario autenticado
        $userId = Auth::id();

        $customer = Customer::create([
            'id' => (string) Str::uuid(),
            'nombre' => $validated['nombre'],
            'name' => $validated['nombre'], // Compatibilidad
            'apellido' => $validated['apellido'] ?? null,
            'cedula' => $validated['cedula'] ?? null,
            'telefono' => $validated['telefono'],
            'phone' => $validated['telefono'], // Compatibilidad
            'email' => $validated['email'] ?? null,
            'address' => $validated['address'] ?? null,
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'created_by_id' => $userId,
        ]);

        return redirect()->route('customers.index')
            ->with('success', 'Cliente creado exitosamente.');
    }

    /**
     * Display the specified customer.
     */
    public function show(Customer $customer)
    {
        
        return Inertia::render('admin/customers/show', [
            'customer' => $customer,
        ]);
    }

    /**
     * Show the form for editing the specified customer.
     */
    public function edit(Customer $customer)
    {
        // Cargar relaciones necesarias
        $customer->load(['createdBy']);
        
        // Obtener lista de staff para account manager (REMOVED)
        // $staff = \App\Models\Staff::where('active', true)
        //    ->orderBy('name')
        //    ->select('id', 'name', 'email')
        //    ->get();
        
        return Inertia::render('admin/customers/edit', [
            'customer' => $customer,
            'staff' => [],
        ]);
    }

    /**
     * Update the specified customer.
     */
    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            // Información básica
            'nombre' => 'required|string|max:255',
            'apellido' => 'nullable|string|max:255',
            'cedula' => 'nullable|string|max:50|unique:customers,cedula,' . $customer->id,
            'rnc' => 'nullable|string|max:11|unique:customers,rnc,' . $customer->id,
            'id_type' => 'nullable|string|max:10|in:CEDULA,RNC,PASAPORTE',
            'business_name' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            // Contacto
            'telefono' => 'required|string|max:20',
            'email' => 'nullable|email|max:255|unique:customers,email,' . $customer->id,
            // Dirección
            'address' => 'nullable|string|max:500',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            // CRM
            'status' => 'nullable|string|max:50|in:active,inactive,potential,vip,blocked',
            'customer_lifetime_value' => 'nullable|numeric|min:0',
            'segment' => 'nullable|string|max:50',
            'category' => 'nullable|string|max:50',
            // 'account_manager_id' => 'nullable|uuid|exists:staff,id',
            // Último contacto
            'last_contact_date' => 'nullable|date',
            'last_contact_type' => 'nullable|string|max:50',
            'last_contact_notes' => 'nullable|string|max:1000',
            // Próxima acción
            'next_action_date' => 'nullable|date',
            'next_action_type' => 'nullable|string|max:50',
            'next_action_notes' => 'nullable|string|max:1000',
            // Notas, canales y preferencias (JSON)
            'notes' => 'nullable|array',
            'preferred_channels' => 'nullable|array',
            'social_media' => 'nullable|array',
            'preferences' => 'nullable|array',
            // Marketing
            'marketing_consent' => 'nullable|boolean',
            'marketing_consent_date' => 'nullable|date',
            // Satisfacción
            'satisfaction_score' => 'nullable|integer|min:1|max:10',
        ]);

        // Actualizar campos con compatibilidad
        $updateData = [
            'nombre' => $validated['nombre'],
            'name' => $validated['nombre'], // Compatibilidad
            'apellido' => $validated['apellido'] ?? null,
            'cedula' => $validated['cedula'] ?? null,
            'rnc' => $validated['rnc'] ?? null,
            'id_type' => $validated['id_type'] ?? null,
            'business_name' => $validated['business_name'] ?? null,
            'date_of_birth' => $validated['date_of_birth'] ?? null,
            'telefono' => $validated['telefono'],
            'phone' => $validated['telefono'], // Compatibilidad
            'email' => $validated['email'] ?? null,
            'address' => $validated['address'] ?? null,
            'city' => $validated['city'] ?? null,
            'country' => $validated['country'] ?? 'República Dominicana',
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            // Campos CRM
            'status' => $validated['status'] ?? 'active',
            'customer_lifetime_value' => $validated['customer_lifetime_value'] ?? 0,
            'segment' => $validated['segment'] ?? null,
            'category' => $validated['category'] ?? null,
            // 'account_manager_id' => $validated['account_manager_id'] ?? null,
            'last_contact_date' => $validated['last_contact_date'] ?? null,
            'last_contact_type' => $validated['last_contact_type'] ?? null,
            'last_contact_notes' => $validated['last_contact_notes'] ?? null,
            'next_action_date' => $validated['next_action_date'] ?? null,
            'next_action_type' => $validated['next_action_type'] ?? null,
            'next_action_notes' => $validated['next_action_notes'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'preferred_channels' => $validated['preferred_channels'] ?? null,
            'social_media' => $validated['social_media'] ?? null,
            'preferences' => $validated['preferences'] ?? null,
            'marketing_consent' => $validated['marketing_consent'] ?? false,
            'marketing_consent_date' => $validated['marketing_consent'] ? ($validated['marketing_consent_date'] ?? now()) : null,
            'satisfaction_score' => $validated['satisfaction_score'] ?? null,
        ];

        // Si se actualiza satisfaction_score, actualizar también satisfaction_last_updated
        if (isset($validated['satisfaction_score']) && $validated['satisfaction_score'] !== null) {
            $updateData['satisfaction_last_updated'] = now();
        }

        $customer->update($updateData);

        return redirect()->route('customers.index')
            ->with('success', 'Cliente actualizado exitosamente.');
    }

    /**
     * Search customers for autocomplete.
     */
    public function search(Request $request)
    {
        // Support both 'q' and 'search' parameters
        $query = $request->input('search', $request->input('q', ''));
        $limit = $request->input('limit', 10);
        
        if (strlen($query) < 2) {
            return response()->json([
                'data' => [],
                'total' => 0
            ]);
        }

        $customers = Customer::where(function($q) use ($query) {
                $q->where('nombre', 'like', "%{$query}%")
                  ->orWhere('apellido', 'like', "%{$query}%")
                  ->orWhere('name', 'like', "%{$query}%")
                  ->orWhere('telefono', 'like', "%{$query}%")
                  ->orWhere('phone', 'like', "%{$query}%")
                  ->orWhere('email', 'like', "%{$query}%")
                  ->orWhere('cedula', 'like', "%{$query}%")
                  ->orWhere('rnc', 'like', "%{$query}%")
                  ->orWhere('business_name', 'like', "%{$query}%");
            })
            ->select('id', 'nombre', 'apellido', 'name', 'telefono', 'phone', 'email', 'cedula', 'rnc', 'business_name')
            ->limit($limit)
            ->get()
            ->map(function($customer) {
                return [
                    'id' => $customer->id,
                    'name' => $customer->nombre ?? $customer->name,
                    'nombre_completo' => trim(($customer->nombre ?? $customer->name) . ' ' . ($customer->apellido ?? '')),
                    'apellido' => $customer->apellido,
                    'full_name' => trim(($customer->nombre ?? $customer->name) . ' ' . ($customer->apellido ?? '')),
                    'phone' => $customer->telefono ?? $customer->phone,
                    'telefono' => $customer->telefono ?? $customer->phone,
                    'email' => $customer->email,
                    'cedula' => $customer->cedula,
                    'rnc' => $customer->rnc,
                    'business_name' => $customer->business_name,
                ];
            });

        return response()->json([
            'data' => $customers,
            'total' => $customers->count()
        ]);
    }

    /**
     * Remove the specified customer.
     */
    public function destroy(Customer $customer)
    {
         

        $customer->delete();

        return redirect()->route('customers.index')
            ->with('success', 'Cliente eliminado exitosamente.');
    }
}
