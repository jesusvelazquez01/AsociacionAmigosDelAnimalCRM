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
           // Información Personal
                $table->string('nombre_completo');
                $table->string('email')->nullable();
                $table->integer('edad');
                $table->string('telefono');
                $table->string('domicilio');      // ya existe
                $table->string('localidad');
                $table->string('facebook')->nullable();
                // Información del Hogar
                $table->integer('personas_en_casa');
                $table->enum('todos_de_acuerdo', ['si', 'no', 'tal_vez']);
                $table->text('composicion_familiar');
                // Otros Animales
                $table->enum('tiene_otros_animales', ['si', 'no']);
                $table->text('cuantos_animales')->nullable();
                $table->enum('animales_castrados', ['si', 'no'])->nullable();
                $table->text('motivo_no_castracion')->nullable();
                $table->enum('animales_vacunados', ['si', 'no'])->nullable();
                $table->text('animales_anteriores');
                // Planes Futuros
                $table->text('plan_vacaciones');
                $table->text('plan_embarazo_bebe');
                $table->text('plan_alergia');
                // Estado de la solicitud
                $table->enum('estado', ['pendiente', 'en_revision', 'aprobado', 'rechazado'])->default('pendiente');
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
