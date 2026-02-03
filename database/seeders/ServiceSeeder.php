<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Reparación de Electrodomésticos',
                'description' => 'Reparación de neveras, lavadoras, secadoras, estufas y otros electrodomésticos del hogar',
                'base_price' => 500.00,
                'icon' => '🔧',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Instalación de Aires Acondicionados',
                'description' => 'Instalación profesional de aires acondicionados residenciales y comerciales',
                'base_price' => 1500.00,
                'icon' => '❄️',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Mantenimiento Preventivo',
                'description' => 'Mantenimiento regular y preventivo de equipos para prolongar su vida útil',
                'base_price' => 350.00,
                'icon' => '🛠️',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Limpieza Profunda de Equipos',
                'description' => 'Limpieza profunda y desinfección de electrodomésticos',
                'base_price' => 250.00,
                'icon' => '✨',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Reparación de Aires Acondicionados',
                'description' => 'Diagnóstico y reparación de aires acondicionados con problemas',
                'base_price' => 800.00,
                'icon' => '🌡️',
                'display_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create(array_merge($service, ['id' => (string) Str::uuid()]));
        }
    }
}
