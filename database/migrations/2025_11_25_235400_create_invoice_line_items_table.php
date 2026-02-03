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
        Schema::create('invoice_line_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type'); // service, part, product
            $table->uuid('product_id')->nullable();
            $table->text('description');
            $table->integer('quantity')->default(1);
            $table->decimal('purchase_price', 14, 2)->default(0);
            $table->decimal('sell_price', 14, 2)->default(0);
            $table->uuid('commission_technician_id')->nullable();
            $table->foreign('commission_technician_id')->references('id')->on('staff')->onDelete('set null');
            $table->decimal('commission_amount', 14, 2)->default(0);
            $table->uuid('invoice_id')->nullable();
            $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
            $table->uuid('quote_id')->nullable();
            $table->foreign('quote_id')->references('id')->on('quotes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_line_items');
    }
};
