<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            // Fecha de nacimiento
            if (!Schema::hasColumn('customers', 'date_of_birth')) {
                $table->date('date_of_birth')->nullable()->after('cedula');
            }

            // Ciudad y País
            if (!Schema::hasColumn('customers', 'city')) {
                $table->string('city')->nullable()->after('address');
            }
            if (!Schema::hasColumn('customers', 'country')) {
                $table->string('country')->default('República Dominicana')->after('city');
            }

            // Estado del cliente (activo, inactivo, potencial, etc.)
            if (!Schema::hasColumn('customers', 'status')) {
                $table->string('status')->default('active')->after('country'); // active, inactive, potential, vip, etc.
            }

            // Valor del cliente (Customer Lifetime Value - CLV)
            if (!Schema::hasColumn('customers', 'customer_lifetime_value')) {
                $table->decimal('customer_lifetime_value', 12, 2)->default(0)->after('status');
            }

            // Segmento / Categoría del cliente
            if (!Schema::hasColumn('customers', 'segment')) {
                $table->string('segment')->nullable()->after('customer_lifetime_value'); // vip, regular, potential, etc.
            }
            if (!Schema::hasColumn('customers', 'category')) {
                $table->string('category')->nullable()->after('segment'); // residential, commercial, corporate, etc.
            }

            // Responsable de cuenta (además de created_by_id)
            // Responsable de cuenta (además de created_by_id)
            // if (!Schema::hasColumn('customers', 'account_manager_id')) {
            //     $table->uuid('account_manager_id')->nullable()->after('created_by_id');
            //     $table->foreign('account_manager_id')->references('id')->on('staff')->onDelete('set null');
            // }

            // Último contacto
            if (!Schema::hasColumn('customers', 'last_contact_date')) {
                $table->dateTime('last_contact_date')->nullable()->after('account_manager_id');
            }
            if (!Schema::hasColumn('customers', 'last_contact_type')) {
                $table->string('last_contact_type')->nullable()->after('last_contact_date'); // phone, email, visit, etc.
            }
            if (!Schema::hasColumn('customers', 'last_contact_notes')) {
                $table->text('last_contact_notes')->nullable()->after('last_contact_type');
            }

            // Próxima acción
            if (!Schema::hasColumn('customers', 'next_action_date')) {
                $table->dateTime('next_action_date')->nullable()->after('last_contact_notes');
            }
            if (!Schema::hasColumn('customers', 'next_action_type')) {
                $table->string('next_action_type')->nullable()->after('next_action_date'); // follow_up, quote, service, etc.
            }
            if (!Schema::hasColumn('customers', 'next_action_notes')) {
                $table->text('next_action_notes')->nullable()->after('next_action_type');
            }

            // Notas del cliente (JSON para múltiples notas con fechas)
            if (!Schema::hasColumn('customers', 'notes')) {
                $table->json('notes')->nullable()->after('next_action_notes');
            }

            // Canales preferidos de comunicación
            if (!Schema::hasColumn('customers', 'preferred_channels')) {
                $table->json('preferred_channels')->nullable()->after('notes'); // ['email', 'phone', 'whatsapp', 'sms']
            }

            // Redes sociales (JSON)
            if (!Schema::hasColumn('customers', 'social_media')) {
                $table->json('social_media')->nullable()->after('preferred_channels'); // {facebook: 'url', instagram: 'url', linkedin: 'url'}
            }

            // Preferencias del cliente (JSON)
            if (!Schema::hasColumn('customers', 'preferences')) {
                $table->json('preferences')->nullable()->after('social_media'); // {language: 'es', timezone: 'America/Santo_Domingo', etc.}
            }

            // Consentimiento marketing
            if (!Schema::hasColumn('customers', 'marketing_consent')) {
                $table->boolean('marketing_consent')->default(false)->after('preferences');
            }
            if (!Schema::hasColumn('customers', 'marketing_consent_date')) {
                $table->dateTime('marketing_consent_date')->nullable()->after('marketing_consent');
            }

            // Nivel de satisfacción (1-5 o 1-10)
            if (!Schema::hasColumn('customers', 'satisfaction_score')) {
                $table->integer('satisfaction_score')->nullable()->after('marketing_consent_date'); // 1-10
            }
            if (!Schema::hasColumn('customers', 'satisfaction_last_updated')) {
                $table->dateTime('satisfaction_last_updated')->nullable()->after('satisfaction_score');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $columns = [
                'date_of_birth',
                'city',
                'country',
                'status',
                'customer_lifetime_value',
                'segment',
                'category',
                'account_manager_id',
                'last_contact_date',
                'last_contact_type',
                'last_contact_notes',
                'next_action_date',
                'next_action_type',
                'next_action_notes',
                'notes',
                'preferred_channels',
                'social_media',
                'preferences',
                'marketing_consent',
                'marketing_consent_date',
                'satisfaction_score',
                'satisfaction_last_updated',
            ];

            foreach ($columns as $column) {
                if (Schema::hasColumn('customers', $column)) {
                    if ($column === 'account_manager_id') {
                        $table->dropForeign(['account_manager_id']);
                    }
                    $table->dropColumn($column);
                }
            }
        });
    }
};
