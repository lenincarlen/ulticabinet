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
        Schema::table('invoices', function (Blueprint $table) {
            if (!Schema::hasColumn('invoices', 'billed_by_user_id')) {
                $table->unsignedBigInteger('billed_by_user_id')->nullable()->after('service_order_description');
                $table->foreign('billed_by_user_id')->references('id')->on('users')->onDelete('set null');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            if (Schema::hasColumn('invoices', 'billed_by_user_id')) {
                $table->dropForeign(['billed_by_user_id']);
                $table->dropColumn('billed_by_user_id');
            }
        });
    }
};
