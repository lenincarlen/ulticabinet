<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear los roles
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrador',
                'description' => 'Acceso completo al sistema. Puede gestionar usuarios, roles, y todas las funcionalidades.',
            ],
            [
                'name' => 'operador',
                'display_name' => 'Operador',
                'description' => 'Gestiona órdenes de servicio, asigna técnicos y coordina las visitas.',
            ],
            [
                'name' => 'vendedor',
                'display_name' => 'Vendedor',
                'description' => 'Gestiona clientes, cotizaciones y ventas. Puede usar la caja registradora (POS) para procesar ventas.',
            ],
            [
                'name' => 'tecnico',
                'display_name' => 'Técnico',
                'description' => 'Accede a su calendario, ve las órdenes asignadas y actualiza el estado de las visitas.',
            ],
        ];

        foreach ($roles as $roleData) {
            Role::firstOrCreate(
                ['name' => $roleData['name']],
                $roleData
            );
        }

        // Crear usuarios de ejemplo para cada rol
        // Nota: El campo 'name' fue removido de users, ahora viene de staff
        $users = [
            // Admin
            [
                'email' => 'admin@ulticabinet.com',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
                'is_active' => true,
                'role' => 'admin',
            ],
       
            // Operadores
            [
                'email' => 'operador@ulticabinet.com',
                'password' => Hash::make('operador123'),
                'email_verified_at' => now(),
                'is_active' => true,
                'role' => 'operador',
            ],
         
            // Vendedores
            [
                'email' => 'vendedor@ulticabinet.com',
                'password' => Hash::make('vendedor123'),
                'email_verified_at' => now(),
                'is_active' => true,
                'role' => 'vendedor',
            ],
         
          
         
            
         
        ];

        foreach ($users as $userData) {
            $roleName = $userData['role'];
            $userEmail = $userData['email'];
            unset($userData['role']);

            $user = User::firstOrCreate(
                ['email' => $userEmail],
                $userData
            );

            // Asignar el rol al usuario
            $role = Role::where('name', $roleName)->first();
            if ($role && !$user->hasRole($roleName)) {
                $user->roles()->attach($role->id);
            }
        }

        $this->command->info('Roles y usuarios de ejemplo creados exitosamente!');
        $this->command->info('');
        $this->command->info('Usuarios Admin (password: password):');
        $this->command->info('  - admin@misterservices.com');
        $this->command->info('  - admin2@misterservices.com');
        $this->command->info('');
        $this->command->info('Usuarios Operador (password: password):');
        $this->command->info('  - operador@misterservices.com');
        $this->command->info('  - operador2@misterservices.com');
        $this->command->info('');
        $this->command->info('Usuarios Vendedor (password: password):');
        $this->command->info('  - vendedor@misterservices.com');
        $this->command->info('  - vendedor2@misterservices.com');
        $this->command->info('');
        $this->command->info('Usuarios Técnico (password: password):');
        $this->command->info('  - tecnico@misterservices.com');
        $this->command->info('  - tecnico2@misterservices.com');
        $this->command->info('  - tecnico3@misterservices.com');
    }
}
