<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Padrino extends Model
{
    protected $fillable = [
        'nombre',
        'apellido',
        'email',
        'telefono',
        'fecha_nacimiento',
        'genero',
        'direccion',
        'ciudad',
        'provincia',
        'pais',
        'codigo_postal',
        'activo',
        'notas',
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date',
        'activo' => 'boolean',
    ];

    /**
     * Relación N:N con Animalitos
     */
    public function animalitos(): BelongsToMany
    {
        return $this->belongsToMany(Animalito::class, 'animalito_padrino')
            ->withPivot(['fecha_inicio', 'monto_mensual', 'activo', 'notas'])
            ->withTimestamps();
    }

    /**
     * Accessor para nombre completo
     */
    public function getNombreCompletoAttribute(): string
    {
        return "{$this->nombre} {$this->apellido}";
    }
}
