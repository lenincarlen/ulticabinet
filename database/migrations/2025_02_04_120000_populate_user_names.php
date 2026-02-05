<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Populate name from staff for existing users
        $users = DB::table('users')->whereNotNull('staff_id')->get();
        
        foreach ($users as $user) {
            $staff = DB::table('staff')->where('id', $user->staff_id)->first();
            if ($staff) {
                DB::table('users')->where('id', $user->id)->update(['name' => $staff->name]);
            }
        }

        // fallback for users without staff (should rely on email if name is null, but let's set it)
        DB::table('users')->whereNull('name')->update(['name' => DB::raw('email')]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No need to reverse data population
    }
};
