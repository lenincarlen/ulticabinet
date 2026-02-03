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
        Schema::create('invoices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('invoice_number')->unique();
            $table->uuid('customer_id');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->dateTime('date');
            $table->decimal('subtotal', 14, 2)->default(0);
            $table->float('discount')->default(0);
            $table->boolean('is_taxable')->default(true);
            $table->decimal('taxes', 14, 2)->default(0);
            $table->decimal('total', 14, 2)->default(0);
            $table->string('status')->default('pending'); // pending, paid, cancelled
            $table->decimal('paid_amount', 14, 2)->default(0);
            $table->uuid('service_order_id')->nullable();
            $table->foreign('service_order_id')->references('id')->on('service_orders')->onDelete('set null');
            $table->text('service_order_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
