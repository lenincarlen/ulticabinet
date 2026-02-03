<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = [
            [
                'nombre' => 'José',
                'apellido' => 'García',
                'cedula' => '001-1234567-8',
                'email' => 'jose.garcia@email.com',
                'telefono' => '809-555-0101',
                'address' => 'Calle Principal #123, Santo Domingo',
            ],
            [
                'nombre' => 'María',
                'apellido' => 'Rodríguez',
                'cedula' => '001-2345678-9',
                'email' => 'maria.rodriguez@email.com',
                'telefono' => '809-555-0102',
                'address' => 'Avenida Independencia #456, Santiago',
            ],
            [
                'nombre' => 'Carlos',
                'apellido' => 'Martínez',
                'cedula' => '001-3456789-0',
                'email' => 'carlos.martinez@email.com',
                'telefono' => '809-555-0103',
                'address' => 'Calle Duarte #789, La Vega',
            ],
            [
                'nombre' => 'Ana',
                'apellido' => 'López',
                'cedula' => '001-4567890-1',
                'email' => 'ana.lopez@email.com',
                'telefono' => '809-555-0104',
                'address' => 'Avenida 27 de Febrero #321, Santo Domingo',
            ],
            [
                'nombre' => 'Pedro',
                'apellido' => 'Sánchez',
                'cedula' => '001-5678901-2',
                'email' => 'pedro.sanchez@email.com',
                'telefono' => '809-555-0105',
                'address' => 'Calle Mella #654, San Cristóbal',
            ],
            [
                'nombre' => 'Laura',
                'apellido' => 'Fernández',
                'cedula' => '001-6789012-3',
                'email' => 'laura.fernandez@email.com',
                'telefono' => '809-555-0106',
                'address' => 'Avenida Winston Churchill #987, Santo Domingo',
            ],
            [
                'nombre' => 'Roberto',
                'apellido' => 'Torres',
                'cedula' => '001-7890123-4',
                'email' => 'roberto.torres@email.com',
                'telefono' => '809-555-0107',
                'address' => 'Calle Las Mercedes #147, Puerto Plata',
            ],
            [
                'nombre' => 'Carmen',
                'apellido' => 'Ramírez',
                'cedula' => '001-8901234-5',
                'email' => 'carmen.ramirez@email.com',
                'telefono' => '809-555-0108',
                'address' => 'Avenida Máximo Gómez #258, La Romana',
            ],
            [
                'nombre' => 'Miguel',
                'apellido' => 'Díaz',
                'cedula' => '001-9012345-6',
                'email' => 'miguel.diaz@email.com',
                'telefono' => '809-555-0109',
                'address' => 'Calle 30 de Marzo #369, San Pedro de Macorís',
            ],
            [
                'nombre' => 'Isabel',
                'apellido' => 'Morales',
                'cedula' => '001-0123456-7',
                'email' => 'isabel.morales@email.com',
                'telefono' => '809-555-0110',
                'address' => 'Avenida Circunvalación #741, Santiago',
            ],
        ];

        foreach ($customers as $customerData) {
            Customer::firstOrCreate(
                ['cedula' => $customerData['cedula']],
                [
                    'id' => (string) Str::uuid(),
                    'nombre' => $customerData['nombre'],
                    'name' => $customerData['nombre'], // Compatibilidad
                    'apellido' => $customerData['apellido'],
                    'cedula' => $customerData['cedula'],
                    'email' => $customerData['email'],
                    'telefono' => $customerData['telefono'],
                    'phone' => $customerData['telefono'], // Compatibilidad
                    'address' => $customerData['address'],
                ]
            );
        }

        $this->command->info('Clientes de ejemplo creados exitosamente!');
        $this->command->info('Total de clientes creados: ' . count($customers));
    }
}
