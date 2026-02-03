<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Staff;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Primero sincronizar nombres de staff a users antes de eliminar
        // Usar Eloquent para compatibilidad con todas las bases de datos
        $usersWithStaff = User::whereNotNull('staff_id')
            ->with('staff')
            ->get();

        foreach ($usersWithStaff as $user) {
            if ($user->staff && $user->getRawOriginal('name') !== $user->staff->name) {
                // Actualizar directamente en la base de datos para evitar el accessor
                \DB::table('users')
                    ->where('id', $user->id)
                    ->update(['name' => $user->staff->name]);
            }
        }

        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'name')) {
                $table->dropColumn('name');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->after('id');
        });

        // Restaurar nombres desde staff usando Eloquent
        $usersWithStaff = User::whereNotNull('staff_id')
            ->with('staff')
            ->get();

        foreach ($usersWithStaff as $user) {
            if ($user->staff) {
                \DB::table('users')
                    ->where('id', $user->id)
                    ->update(['name' => $user->staff->name]);
            }
        }
    }
};
