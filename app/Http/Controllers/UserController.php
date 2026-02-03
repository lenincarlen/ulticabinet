<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Staff;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with(['staff', 'roles'])
            ->orderBy('created_at', 'desc')
            ->get();

        $staffWithoutUsers = Staff::whereDoesntHave('user')
            ->orderBy('name')
            ->get();

        $roles = Role::orderBy('name')->get();

        return \Inertia\Inertia::render('admin/users/index', [
            'users' => $users,
            'staffWithoutUsers' => $staffWithoutUsers,
            'roles' => $roles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $staffWithoutUsers = Staff::whereDoesntHave('user')
            ->orderBy('name')
            ->get();

        $roles = Role::orderBy('name')->get();

        return \Inertia\Inertia::render('admin/users/create', [
            'staffWithoutUsers' => $staffWithoutUsers,
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'staff_id' => 'required|uuid|exists:staff,id|unique:users,staff_id',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
            'role' => 'required|string|exists:roles,name',
            'is_active' => 'boolean',
        ], [
            'staff_id.required' => 'Debe seleccionar un empleado.',
            'staff_id.unique' => 'Este empleado ya tiene una cuenta de usuario.',
            'password.required' => 'La contraseña es requerida.',
            'role.required' => 'Debe seleccionar un rol.',
        ]);

        // Obtener información del staff
        $staff = Staff::findOrFail($validated['staff_id']);

        // Validar que el email coincida con el email del staff
        if ($validated['email'] !== $staff->email) {
            return back()->withErrors([
                'email' => 'El email debe coincidir con el email del empleado: ' . $staff->email
            ]);
        }

        // Crear el usuario (name viene automáticamente del accessor en el modelo)
        $user = User::create([
            'email' => $staff->email, // Usar el email del staff
            'password' => Hash::make($validated['password']),
            'staff_id' => $validated['staff_id'],
            'is_active' => $validated['is_active'] ?? true,
            'email_verified_at' => now(),
        ]);

        // Asignar el rol
        $role = Role::where('name', $validated['role'])->first();
        if ($role) {
            $user->roles()->attach($role->id);
        }

        return redirect()->route('users.index')
            ->with('success', 'Usuario creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load(['staff', 'roles']);

        return \Inertia\Inertia::render('admin/users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load(['staff', 'roles']);
        
        $roles = Role::orderBy('name')->get();

        return \Inertia\Inertia::render('admin/users/edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => [
                'nullable',
                'string',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
            'role' => 'required|string|exists:roles,name',
            'is_active' => 'boolean',
        ], [
            'role.required' => 'Debe seleccionar un rol.',
        ]);

        // Si tiene staff, validar que el email coincida
        if ($user->staff_id && $user->staff) {
            if ($validated['email'] !== $user->staff->email) {
                return back()->withErrors([
                    'email' => 'El email debe coincidir con el email del empleado: ' . $user->staff->email
                ]);
            }
        }

        $user->email = $validated['email'];
        $user->is_active = $validated['is_active'] ?? $user->is_active;

        // Actualizar contraseña si se proporciona
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        // Actualizar roles
        $role = Role::where('name', $validated['role'])->first();
        if ($role) {
            $user->roles()->sync([$role->id]);
        }

        return redirect()->route('users.index')
            ->with('success', 'Usuario actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'Usuario eliminado exitosamente.');
    }
}
