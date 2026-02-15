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
        Schema::create('action_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('action');
            $table->timestamp('timestamp')->useCurrent();
            $table->uuid('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('staff')->onDelete('set null');
            $table->uuid('service_order_id')->nullable();
            // $table->foreign('service_order_id')->references('id')->on('service_orders')->onDelete('set null');
            $table->text('details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('action_logs');
    }
};