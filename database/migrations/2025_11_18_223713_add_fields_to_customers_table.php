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
            // Agregar campos nuevos
            $table->string('apellido')->nullable()->after('name');
            $table->string('cedula')->unique()->nullable()->after('apellido');
            // Agregar campos con nombres en español para compatibilidad
            $table->string('nombre')->nullable()->after('apellido');
            $table->string('telefono')->nullable()->after('email');
            // Agregar campo address si no existe
            if (!Schema::hasColumn('customers', 'address')) {
                $table->string('address')->nullable()->after('telefono');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn(['apellido', 'cedula', 'nombre', 'telefono']);
        });
    }
};
