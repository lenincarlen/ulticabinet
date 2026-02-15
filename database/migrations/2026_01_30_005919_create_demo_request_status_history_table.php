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
            $table->foreignId('demo_request_id')->constrained('demo_requests')->onDelete('cascade');
            $table->string('old_status', 50)->nullable();
            $table->string('new_status', 50);
            $table->foreignId('changed_by_id')->nullable()->constrained('users')->onDelete('set null');
            $table->text('notes')->nullable();
            $table->timestamp('created_at')->useCurrent();
            
            // Foreign keys defined inline above
            
            // Índices
            // $table->index('demo_request_id'); // Created by foreignId
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
