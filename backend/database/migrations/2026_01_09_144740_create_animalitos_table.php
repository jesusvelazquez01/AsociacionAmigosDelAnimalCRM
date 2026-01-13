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
        Schema::create('animalitos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('slug')->unique();
            $table->string('especie');
            $table->string('raza')->nullable();
            $table->integer('edad')->nullable();
            $table->date('fecha_ingreso')->nullable();
            $table->string('genero');
            $table->string('tamaño')->nullable();
            $table->string('color')->nullable();
            $table->text('historia')->nullable();
            $table->string('imagen_url')->nullable();
            $table->boolean('apadrinado')->default(false);
            $table->boolean('adoptado')->default(false);
            $table->boolean('activo')->default(true); // sigue en el refugio
            $table->boolean('estado')->default(true); // mostrar en la web 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animalitos');
    }
};
