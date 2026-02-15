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
        Schema::create('demo_requests', function (Blueprint $table) {
            $table->id();
            
            // Solution reference removed
             
            // Request tracking
            $table->string('request_number', 50)->unique();
            
            // Company information
            $table->string('company_name');
            $table->string('company_size', 20)->nullable(); // 1-10, 11-50, 51-200, 201-500, 500+
            $table->string('industry', 100)->nullable();
            $table->string('current_solution')->nullable();
            
            // Contact information
            $table->string('contact_name');
            $table->string('contact_email');
            $table->string('contact_phone', 20);
            
            // Pain points and preferences
            $table->json('pain_points')->nullable(); // Array of pain points
            $table->date('preferred_date')->nullable();
            $table->string('preferred_time', 20)->nullable(); // morning, afternoon, evening
            $table->string('timezone', 50)->nullable();
            $table->string('demo_format', 20)->nullable(); // online, in-person, phone
            $table->text('additional_notes')->nullable();
            
            // Status and assignment
            $table->string('status', 20)->default('pending'); // pending, confirmed, in_progress, completed, cancelled, no_show
            // $table->foreignId('assigned_to')->nullable()->constrained('staff')->onDelete('set null');
            
            // Scheduling
            $table->dateTime('scheduled_at')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->dateTime('cancelled_at')->nullable();
            $table->string('cancellation_reason', 500)->nullable();
            
            // Demo notes and follow-up
            $table->text('demo_notes')->nullable();
            $table->date('follow_up_date')->nullable();
            $table->integer('conversion_probability')->nullable(); // 0-100
            $table->decimal('estimated_value', 10, 2)->nullable();
            
            // Marketing tracking
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();
            $table->string('referrer_url', 500)->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            
            // Timestamps
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('status');
            $table->index('scheduled_at');
            $table->index('created_at');
            $table->index('contact_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demo_requests');
    }
};
