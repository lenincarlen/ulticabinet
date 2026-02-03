<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Calendar;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Password;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staff = Staff::with(['calendar', 'user.roles'])
            ->orderBy('created_at', 'desc')
            ->get();

        $calendars = collect([]);
        if (Schema::hasTable('calendars')) {
            try {
                $calendars = Calendar::where('active', true)->get();
            } catch (\Exception $e) {
                $calendars = collect([]);
            }
        }

        $roles = collect([]);
        if (Schema::hasTable('roles')) {
            try {
                $roles = Role::orderBy('name')->get();
            } catch (\Exception $e) {
                $roles = collect([]);
            }
        }

        return \Inertia\Inertia::render('admin/staff/index', [
            'staff' => $staff,
            'calendars' => $calendars,
            'roles' => $roles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = collect([]);
        if (Schema::hasTable('roles')) {
            try {
                $roles = Role::orderBy('name')->get();
            } catch (\Exception $e) {
                $roles = collect([]);
            }
        }

        return \Inertia\Inertia::render('admin/staff/create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:staff,email',
            'calendar_id' => 'nullable|exists:calendars,id',
            'personal_phone' => 'nullable|string|max:20',
            'fleet_phone' => 'nullable|string|max:20',
            'id_number' => 'nullable|string|max:50',
            'code' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'base_salary' => 'nullable|numeric|min:0',
            'start_date' => 'nullable|date',
            'tss' => 'nullable|numeric|min:0',
            'afp' => 'nullable|numeric|min:0',
            'loans' => 'nullable|numeric|min:0',
            'work_error_deduction' => 'nullable|numeric|min:0',
            'other_deductions' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'required_hours' => 'nullable|numeric|min:0',
            'worked_hours' => 'nullable|numeric|min:0',
            'overtime_value' => 'nullable|numeric|min:0',
            'total_hours_value' => 'nullable|numeric|min:0',
            'income' => 'nullable|numeric|min:0',
            'commission' => 'nullable|numeric|min:0',
            'is_payroll_taxable' => 'nullable|boolean',
            'commission_base' => 'nullable|string|max:50',
            'tss_deduction_schedule' => 'nullable|string|max:50',
            'afp_deduction_schedule' => 'nullable|string|max:50',
            // Archivos de fotos
            'employee_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'id_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            // Campos para crear usuario junto con staff
            'create_user' => 'nullable|boolean',
            'user_password' => [
                'nullable',
                'required_if:create_user,true',
                'string',
                Password::min(8)->mixedCase()->numbers()->symbols(),
            ],
            'user_role' => 'nullable|required_if:create_user,true|string|exists:roles,name',
            'user_is_active' => 'nullable|boolean',
        ]);

        $validated['id'] = (string) Str::uuid();

        DB::transaction(function () use ($validated, $request) {
            // Manejar carga de archivos
            $employeePhotoUrl = null;
            $idPhotoUrl = null;

            if ($request->hasFile('employee_photo')) {
                $employeePhotoUrl = $request->file('employee_photo')->store('staff/photos', 'public');
            }

            if ($request->hasFile('id_photo')) {
                $idPhotoUrl = $request->file('id_photo')->store('staff/ids', 'public');
            }

            // Crear el staff
            $staffData = $validated;
            unset($staffData['create_user'], $staffData['user_password'], $staffData['user_role'], $staffData['user_is_active']);
            unset($staffData['employee_photo'], $staffData['id_photo']);
            
            // Agregar URLs de fotos si existen
            if ($employeePhotoUrl) {
                $staffData['employee_photo_url'] = $employeePhotoUrl;
            }
            if ($idPhotoUrl) {
                $staffData['id_photo_url'] = $idPhotoUrl;
            }
            
            $staff = Staff::create($staffData);

            // Si se solicita crear usuario, crearlo también
            if (!empty($validated['create_user']) && $validated['create_user']) {
                $user = User::create([
                    'email' => $staff->email, // Usar el mismo email del staff
                    'password' => Hash::make($validated['user_password']),
                    'staff_id' => $staff->id,
                    'is_active' => $validated['user_is_active'] ?? true,
                    'email_verified_at' => now(),
                ]);

                // Asignar el rol
                if (!empty($validated['user_role'])) {
                    $role = Role::where('name', $validated['user_role'])->first();
                    if ($role) {
                        $user->roles()->attach($role->id);
                    }
                }
            }
        });

        return redirect()->route('staff.index')
            ->with('success', 'Personal creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Staff $staff)
    {
        $staff->load(['calendar', 'user.roles']);
        
        return \Inertia\Inertia::render('admin/staff/show', [
            'staff' => $staff,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staff $staff)
    {
        $staff->load(['calendar', 'user.roles']);
        
        $calendars = collect([]);
        if (Schema::hasTable('calendars')) {
            try {
                $calendars = Calendar::where('active', true)->get();
            } catch (\Exception $e) {
                $calendars = collect([]);
            }
        }

        $roles = collect([]);
        if (Schema::hasTable('roles')) {
            try {
                $roles = Role::orderBy('name')->get();
            } catch (\Exception $e) {
                $roles = collect([]);
            }
        }

        return \Inertia\Inertia::render('admin/staff/edit', [
            'staff' => $staff,
            'calendars' => $calendars,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Staff $staff)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:staff,email,' . $staff->id,
            'calendar_id' => 'nullable|exists:calendars,id',
            'personal_phone' => 'nullable|string|max:20',
            'fleet_phone' => 'nullable|string|max:20',
            'id_number' => 'nullable|string|max:50',
            'access_key' => 'nullable|string|max:255',
            'code' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'base_salary' => 'nullable|numeric|min:0',
            'start_date' => 'nullable|date',
            'tss' => 'nullable|numeric|min:0',
            'afp' => 'nullable|numeric|min:0',
            'loans' => 'nullable|numeric|min:0',
            'work_error_deduction' => 'nullable|numeric|min:0',
            'other_deductions' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'required_hours' => 'nullable|numeric|min:0',
            'worked_hours' => 'nullable|numeric|min:0',
            'overtime_value' => 'nullable|numeric|min:0',
            'total_hours_value' => 'nullable|numeric|min:0',
            'income' => 'nullable|numeric|min:0',
            'commission' => 'nullable|numeric|min:0',
            'is_payroll_taxable' => 'nullable|boolean',
            'commission_base' => 'nullable|numeric|min:0',
            'tss_deduction_schedule' => 'nullable|array',
            'afp_deduction_schedule' => 'nullable|array',
            'id_photo_url' => 'nullable|url|max:500',
            'employee_photo_url' => 'nullable|url|max:500',
        ]);

        DB::transaction(function () use ($validated, $staff) {
            $oldEmail = $staff->email;
            $staff->update($validated);

            // Si cambió el email y tiene usuario, actualizar email del usuario también
            if ($staff->user && $oldEmail !== $validated['email']) {
                $staff->user->email = $validated['email'];
                $staff->user->save();
            }
        });

        return redirect()->route('staff.index')
            ->with('success', 'Personal actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff)
    {
        $staff->delete();

        return redirect()->route('staff.index')
            ->with('success', 'Personal eliminado exitosamente.');
    }
}