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
        Schema::create('solutions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('short_description', 500)->nullable();
            $table->string('icon', 100)->nullable(); // Lucide icon name
            $table->string('category', 100)->nullable();
            $table->json('features')->nullable(); // Array of features
            $table->json('benefits')->nullable(); // Array of benefits
            $table->json('target_audience')->nullable(); // Array of target audiences
            $table->string('pricing_model', 50)->nullable(); // subscription, one-time, custom
            $table->integer('demo_duration_minutes')->default(30);
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->string('meta_title', 255)->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('is_active');
            $table->index('display_order');
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solutions');
    }
};
