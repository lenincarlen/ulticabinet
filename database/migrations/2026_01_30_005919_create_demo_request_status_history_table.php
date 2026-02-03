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
        Schema::create('demo_request_status_history', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('demo_request_id');
            $table->string('old_status', 50)->nullable();
            $table->string('new_status', 50);
            $table->uuid('changed_by_id')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('created_at')->useCurrent();
            
            // Foreign keys
            $table->foreign('demo_request_id')->references('id')->on('demo_requests')->onDelete('cascade');
            $table->foreign('changed_by_id')->references('id')->on('users')->onDelete('set null');
            
            // Índices
            $table->index('demo_request_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demo_request_status_history');
    }
};
