<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adoptante extends Model
{
    protected $fillable = [
        'nombre_completo',
        'dni',
        'telefono',
        'email',
        'calle',
        'direccion',
        'numero',
        'piso',
        'puerta',
        'domicilio',
        'referencia_domicilio',
        'facebook'
    ];

    /**
     * Relación N:N con Animalitos
     */
    public function animalitos()
    {
        return $this->belongsToMany(Animalito::class, 'animalito_adoptante')
            ->withTimestamps();
    }
}
