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
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('action'); // created, updated, deleted, processed, etc.
            $table->string('model_type')->nullable(); // ServiceOrder, Invoice, etc.
            $table->uuid('model_id')->nullable();
            $table->text('description')->nullable(); // Human-readable description
            $table->json('changes')->nullable(); // JSON of what changed
            $table->json('metadata')->nullable(); // Additional context
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();
            
            // Indexes
            // $table->index('user_id'); // Created by foreignId
            $table->index('model_type');
            $table->index('model_id');
            $table->index(['model_type', 'model_id']);
            $table->index('created_at');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
