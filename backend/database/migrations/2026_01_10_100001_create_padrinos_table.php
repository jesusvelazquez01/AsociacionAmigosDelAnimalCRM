<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('padrinos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido');
            $table->string('email')->unique();
            $table->string('telefono')->nullable();
            $table->date('fecha_nacimiento')->nullable();
            $table->string('genero')->nullable();
            $table->string('direccion')->nullable();
            $table->string('ciudad')->nullable();
            $table->string('provincia')->nullable();
            $table->string('pais')->default('Argentina');
            $table->string('codigo_postal')->nullable();
            $table->boolean('activo')->default(true);
            $table->text('notas')->nullable();
            $table->timestamps();
        });

        // Tabla pivote para la relación N:N entre Animalito y Padrino
        Schema::create('animalito_padrino', function (Blueprint $table) {
            $table->id();
            $table->foreignId('animalito_id')->constrained()->cascadeOnDelete();
            $table->foreignId('padrino_id')->constrained()->cascadeOnDelete();
            $table->date('fecha_inicio')->default(now());
            $table->decimal('monto_mensual', 10, 2)->nullable();
            $table->boolean('activo')->default(true);
            $table->text('notas')->nullable();
            $table->timestamps();

            $table->unique(['animalito_id', 'padrino_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('animalito_padrino');
        Schema::dropIfExists('padrinos');
    }
};
