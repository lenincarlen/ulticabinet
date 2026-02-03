<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SiteSetting;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Company Information
            [
                'key' => 'company_name',
                'value' => 'Mister Services',
                'type' => 'text',
                'group' => 'company',
                'description' => 'Nombre de la empresa',
            ],
            [
                'key' => 'company_logo',
                'value' => 'images/ulticabinet-logo.png', // Updated default logo
                'type' => 'image',
                'group' => 'company',
                'description' => 'Logo de la empresa',
            ],
            [
                'key' => 'company_phone',
                'value' => '',
                'type' => 'text',
                'group' => 'company',
                'description' => 'Teléfono de la empresa',
            ],
            [
                'key' => 'company_whatsapp',
                'value' => '',
                'type' => 'text',
                'group' => 'company',
                'description' => 'WhatsApp de la empresa',
            ],
            [
                'key' => 'company_address',
                'value' => '',
                'type' => 'textarea',
                'group' => 'company',
                'description' => 'Dirección de la empresa',
            ],
            [
                'key' => 'company_email',
                'value' => '',
                'type' => 'text',
                'group' => 'company',
                'description' => 'Email de contacto',
            ],
            
            // Theme Settings
            [
                'key' => 'theme_primary_color',
                'value' => '#3b82f6',
                'type' => 'color',
                'group' => 'theme',
                'description' => 'Color primario del tema',
            ],
            [
                'key' => 'theme_secondary_color',
                'value' => '#8b5cf6',
                'type' => 'color',
                'group' => 'theme',
                'description' => 'Color secundario del tema',
            ],
            [
                'key' => 'theme_accent_color',
                'value' => '#10b981',
                'type' => 'color',
                'group' => 'theme',
                'description' => 'Color de acento',
            ],
            [
                'key' => 'theme_font_family',
                'value' => 'Inter',
                'type' => 'text',
                'group' => 'theme',
                'description' => 'Familia de fuente',
            ],
            
            // Landing Page
            [
                'key' => 'landing_hero_title',
                'value' => 'Servicios de Reparación Profesional',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Título principal del landing',
            ],
            [
                'key' => 'landing_hero_subtitle',
                'value' => 'Expertos en reparación de electrodomésticos',
                'type' => 'textarea',
                'group' => 'landing',
                'description' => 'Subtítulo del landing',
            ],
            [
                'key' => 'landing_hero_image',
                'value' => null,
                'type' => 'image',
                'group' => 'landing',
                'description' => 'Imagen principal del landing',
            ],
            [
                'key' => 'landing_logo',
                'value' => null,
                'type' => 'image',
                'group' => 'landing',
                'description' => 'Logo del landing page',
            ],
            [
                'key' => 'landing_banner',
                'value' => null,
                'type' => 'image',
                'group' => 'landing',
                'description' => 'Imagen de banner de fondo del hero',
            ],
            [
                'key' => 'hero_badge_text',
                'value' => 'Servicios Técnicos Profesionales',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Texto del badge en el hero',
            ],
            [
                'key' => 'hero_background_color',
                'value' => 'from-blue-800 via-blue-900 to-blue-800',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Clases de color de fondo del hero (Tailwind CSS)',
            ],
            // Ofertas - Oferta 1
            [
                'key' => 'offer_1_title',
                'value' => 'Costo de servicios',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Título de la oferta 1',
            ],
            [
                'key' => 'offer_1_old_price',
                'value' => '2,500',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Precio anterior de la oferta 1',
            ],
            [
                'key' => 'offer_1_new_price',
                'value' => '1,999',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Precio nuevo de la oferta 1',
            ],
            [
                'key' => 'offer_1_discount',
                'value' => '20%',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Descuento de la oferta 1',
            ],
            [
                'key' => 'offer_1_description',
                'value' => 'Mantenimiento completo de electrodomésticos',
                'type' => 'textarea',
                'group' => 'landing',
                'description' => 'Descripción de la oferta 1',
            ],
            // Ofertas - Oferta 2
            [
                'key' => 'offer_2_title',
                'value' => 'Chequeo rápido',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Título de la oferta 2',
            ],
            [
                'key' => 'offer_2_old_price',
                'value' => '1,800',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Precio anterior de la oferta 2',
            ],
            [
                'key' => 'offer_2_new_price',
                'value' => '1,299',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Precio nuevo de la oferta 2',
            ],
            [
                'key' => 'offer_2_discount',
                'value' => '28%',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Descuento de la oferta 2',
            ],
            [
                'key' => 'offer_2_description',
                'value' => 'Servicio rápido en 24 horas',
                'type' => 'textarea',
                'group' => 'landing',
                'description' => 'Descripción de la oferta 2',
            ],
            // Ofertas - Oferta 3
            [
                'key' => 'offer_3_title',
                'value' => 'Plan de mantenimiento',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Título de la oferta 3',
            ],
            [
                'key' => 'offer_3_old_price',
                'value' => '4,500',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Precio anterior de la oferta 3',
            ],
            [
                'key' => 'offer_3_new_price',
                'value' => '3,499',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Precio nuevo de la oferta 3',
            ],
            [
                'key' => 'offer_3_discount',
                'value' => '22%',
                'type' => 'text',
                'group' => 'landing',
                'description' => 'Descuento de la oferta 3',
            ],
            [
                'key' => 'offer_3_description',
                'value' => 'Múltiples reparaciones con descuento',
                'type' => 'textarea',
                'group' => 'landing',
                'description' => 'Descripción de la oferta 3',
            ],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
