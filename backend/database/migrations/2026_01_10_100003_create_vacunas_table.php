<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vacunas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('animalito_id')->constrained()->cascadeOnDelete();
            $table->string('nombre');
            $table->string('lote')->nullable();
            $table->date('fecha_aplicacion');
            $table->date('fecha_proxima')->nullable();
            $table->string('veterinario')->nullable();
            $table->decimal('costo', 10, 2)->default(0);
            $table->text('observaciones')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vacunas');
    }
};
