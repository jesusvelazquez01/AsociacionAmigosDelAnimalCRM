<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tratamiento extends Model
{
    protected $fillable = [
        'animalito_id',
        'veterinario_id',
        'nombre',
        'descripcion',
        'fecha_inicio',
        'fecha_fin',
        'costo',
        'estado',
        'observaciones',
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
        'costo' => 'decimal:2',
    ];

    /**
     * Relación con Animalito
     */
    public function animalito(): BelongsTo
    {
        return $this->belongsTo(Animalito::class);
    }

    /**
     * Relación con Veterinario
     */
    public function veterinario(): BelongsTo
    {
        return $this->belongsTo(Veterinario::class);
    }


    /**
     * Boot method para actualizar estado del animalito cuando hay tratamiento activo
     */
    protected static function boot()
    {
        parent::boot();

        static::saved(function ($tratamiento) {
            $tratamiento->animalito->actualizarEstadoPorTratamiento();
        });

        static::deleted(function ($tratamiento) {
            $tratamiento->animalito->actualizarEstadoPorTratamiento();
        });
    }
}
