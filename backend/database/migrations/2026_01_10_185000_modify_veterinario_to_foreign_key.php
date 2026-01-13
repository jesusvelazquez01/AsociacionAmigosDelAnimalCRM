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
        // Modificar tabla tratamientos
        Schema::table('tratamientos', function (Blueprint $table) {
            $table->dropColumn('veterinario');
            $table->foreignId('veterinario_id')->nullable()->constrained()->nullOnDelete();
        });

        // Modificar tabla vacunas
        Schema::table('vacunas', function (Blueprint $table) {
            $table->dropColumn('veterinario');
            $table->foreignId('veterinario_id')->nullable()->constrained()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tratamientos', function (Blueprint $table) {
            $table->dropForeign(['veterinario_id']);
            $table->dropColumn('veterinario_id');
            $table->string('veterinario')->nullable();
        });

        Schema::table('vacunas', function (Blueprint $table) {
            $table->dropForeign(['veterinario_id']);
            $table->dropColumn('veterinario_id');
            $table->string('veterinario')->nullable();
        });
    }
};
