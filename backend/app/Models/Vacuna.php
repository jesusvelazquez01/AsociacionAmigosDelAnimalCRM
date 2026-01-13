<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vacuna extends Model
{
    protected $fillable = [
        'animalito_id',
        'veterinario_id',
        'nombre',
        'lote',
        'fecha_aplicacion',
        'fecha_proxima',
        'costo',
        'observaciones',
    ];

    protected $casts = [
        'fecha_aplicacion' => 'date',
        'fecha_proxima' => 'date',
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
     * Accessor para verificar si necesita refuerzo pronto (próximos 30 días)
     */
    public function getNecesitaRefuerzoAttribute(): bool
    {
        if (!$this->fecha_proxima) {
            return false;
        }
        return $this->fecha_proxima->isBefore(now()->addDays(30));
    }
}
