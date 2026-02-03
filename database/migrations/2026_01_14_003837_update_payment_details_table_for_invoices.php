<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('payment_details', function (Blueprint $table) {
            // Hacer service_order_id nullable
            $table->uuid('service_order_id')->nullable()->change();
            
            // Agregar invoice_id
            if (!Schema::hasColumn('payment_details', 'invoice_id')) {
                $table->uuid('invoice_id')->nullable()->after('service_order_id');
                $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
            }
            
            // Agregar método como alias (el código usa 'method' pero la tabla tiene 'payment_method')
            // SQLite no soporta renameColumn fácilmente, así que agregamos 'method' como columna adicional
            if (!Schema::hasColumn('payment_details', 'method')) {
                $table->string('method')->nullable()->after('payment_method');
            }
            
            // Agregar columnas nuevas
            if (!Schema::hasColumn('payment_details', 'cash_received')) {
                $table->decimal('cash_received', 10, 2)->nullable()->after('amount');
            }
            
            if (!Schema::hasColumn('payment_details', 'change_given')) {
                $table->decimal('change_given', 10, 2)->nullable()->after('cash_received');
            }
            
            if (!Schema::hasColumn('payment_details', 'payment_date')) {
                $table->dateTime('payment_date')->nullable()->after('change_given');
            }
            
            if (!Schema::hasColumn('payment_details', 'bank_account_id')) {
                $table->uuid('bank_account_id')->nullable()->after('payment_date');
                $table->foreign('bank_account_id')->references('id')->on('bank_accounts')->onDelete('set null');
            }
            
            if (!Schema::hasColumn('payment_details', 'commission_technician_id')) {
                $table->uuid('commission_technician_id')->nullable()->after('bank_account_id');
                $table->foreign('commission_technician_id')->references('id')->on('staff')->onDelete('set null');
            }
        });
        
        // Actualizar la columna 'method' para copiar valores de 'payment_method'
        // SQLite no soporta UPDATE en migrations fácilmente, así que lo haremos con DB::statement
        DB::statement('UPDATE payment_details SET method = payment_method WHERE method IS NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payment_details', function (Blueprint $table) {
            // Revertir cambios
            if (Schema::hasColumn('payment_details', 'commission_technician_id')) {
                $table->dropForeign(['commission_technician_id']);
                $table->dropColumn('commission_technician_id');
            }
            
            if (Schema::hasColumn('payment_details', 'bank_account_id')) {
                $table->dropForeign(['bank_account_id']);
                $table->dropColumn('bank_account_id');
            }
            
            if (Schema::hasColumn('payment_details', 'payment_date')) {
                $table->dropColumn('payment_date');
            }
            
            if (Schema::hasColumn('payment_details', 'change_given')) {
                $table->dropColumn('change_given');
            }
            
            if (Schema::hasColumn('payment_details', 'cash_received')) {
                $table->dropColumn('cash_received');
            }
            
            if (Schema::hasColumn('payment_details', 'method')) {
                $table->dropColumn('method');
            }
            
            if (Schema::hasColumn('payment_details', 'invoice_id')) {
                $table->dropForeign(['invoice_id']);
                $table->dropColumn('invoice_id');
            }
        });
    }
};
