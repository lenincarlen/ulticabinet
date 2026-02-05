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
        if (!Schema::hasTable('staff')) {
            Schema::create('staff', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('name');
                $table->string('email')->nullable();
                $table->uuid('calendar_id')->nullable();
                $table->string('personal_phone')->nullable();
                $table->string('fleet_phone')->nullable();
                $table->string('id_number')->nullable();
                $table->string('access_key')->nullable();
                $table->string('code')->nullable();
                $table->text('address')->nullable();
                
                // Financial fields
                $table->decimal('salary', 10, 2)->nullable();
                $table->date('start_date')->nullable();
                $table->decimal('tss', 10, 2)->nullable();
                $table->decimal('afp', 10, 2)->nullable();
                $table->decimal('loans', 10, 2)->nullable();
                $table->decimal('work_error_deduction', 10, 2)->nullable();
                $table->decimal('other_deductions', 10, 2)->nullable();
                $table->decimal('discount', 10, 2)->nullable();
                
                // Work hours & Income
                $table->decimal('required_hours', 8, 2)->nullable();
                $table->decimal('worked_hours', 8, 2)->nullable();
                $table->decimal('overtime_value', 10, 2)->nullable();
                $table->decimal('total_hours_value', 10, 2)->nullable();
                $table->decimal('income', 10, 2)->nullable();
                $table->decimal('commission', 10, 2)->nullable();
                
                $table->boolean('is_payroll_taxable')->default(false);
                $table->decimal('commission_base', 10, 2)->nullable();
                
                $table->string('tss_deduction_schedule')->nullable();
                $table->string('afp_deduction_schedule')->nullable();
                
                $table->string('id_photo_url')->nullable();
                $table->string('employee_photo_url')->nullable();
                
                $table->integer('active_orders_count')->default(0);
                $table->integer('total_assigned_orders')->default(0);
                $table->timestamp('last_assignment_at')->nullable();
                
                $table->timestamps();
            });
        }

        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'staff_id')) {
                $table->uuid('staff_id')->nullable()->after('id');
                // We add index but careful with foreign key if staff table didn't exist when users was created
                // Now staff exists, we can try to add foreign key if possible, but data might be inconsistent
                // Let's just add the column for now as User model defines relation
                $table->index('staff_id'); 
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'staff_id')) {
                $table->dropColumn('staff_id');
            }
        });

        Schema::dropIfExists('staff');
    }
};
