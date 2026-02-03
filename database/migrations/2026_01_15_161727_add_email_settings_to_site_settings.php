<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Agregar configuraciones de correo electrónico
        DB::table('site_settings')->insert([
            // Configuración SMTP
            [
                'key' => 'mail_driver',
                'value' => 'smtp',
                'type' => 'select',
                'group' => 'email',
                'description' => 'Driver de correo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'mail_host',
                'value' => '',
                'type' => 'text',
                'group' => 'email',
                'description' => 'Servidor SMTP',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'mail_port',
                'value' => '587',
                'type' => 'number',
                'group' => 'email',
                'description' => 'Puerto SMTP',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'mail_username',
                'value' => '',
                'type' => 'text',
                'group' => 'email',
                'description' => 'Usuario SMTP',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'mail_password',
                'value' => '',
                'type' => 'password',
                'group' => 'email',
                'description' => 'Contraseña SMTP',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'mail_encryption',
                'value' => 'tls',
                'type' => 'select',
                'group' => 'email',
                'description' => 'Encriptación',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'mail_from_address',
                'value' => '',
                'type' => 'email',
                'group' => 'email',
                'description' => 'Correo remitente',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'mail_from_name',
                'value' => '',
                'type' => 'text',
                'group' => 'email',
                'description' => 'Nombre remitente',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Configuración de notificaciones
            [
                'key' => 'notifications_enabled',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'email',
                'description' => 'Activar notificaciones por correo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'notify_new_orders',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'email',
                'description' => 'Notificar nuevas órdenes',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'notify_status_changes',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'email',
                'description' => 'Notificar cambios de estatus',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'notify_invoices',
                'value' => 'true',
                'type' => 'boolean',
                'group' => 'email',
                'description' => 'Enviar facturas por correo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'admin_notification_email',
                'value' => '',
                'type' => 'email',
                'group' => 'email',
                'description' => 'Correo para notificaciones administrativas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('site_settings')
            ->where('group', 'email')
            ->delete();
    }
};
