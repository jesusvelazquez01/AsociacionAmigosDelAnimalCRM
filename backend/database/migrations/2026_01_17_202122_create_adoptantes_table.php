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
        Schema::create('adoptantes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_completo');
            $table->string('telefono');
            $table->string('email');
            $table->string('domicilio');
            $table->string('direccion');
            $table->string('numero')->nullable();
            $table->string('piso')->nullable();
            $table->string('puerta')->nullable();
            $table->string('referencia_domicilio')->nullable();
            $table->string('facebook')->nullable();
            $table->timestamps();
        });
          // Tabla pivote para la relación N:N entre Animalito y Padrino
        Schema::create('animalito_adoptante', function (Blueprint $table) {
            $table->id();
            $table->foreignId('animalito_id')->constrained()->cascadeOnDelete();
            $table->foreignId('adoptante_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['animalito_id', 'adoptante_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {   
        Schema::dropIfExists('animalito_adoptante');
        Schema::dropIfExists('adoptantes');
       
    }
};
