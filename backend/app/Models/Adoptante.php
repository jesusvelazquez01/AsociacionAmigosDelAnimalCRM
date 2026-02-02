<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adoptante extends Model
{
protected $fillable = [
    // Personal
    'nombre_completo',
    'email',
    'edad',
    'telefono',
    'domicilio',
    'localidad',
    'facebook',
    
    // Hogar
    'personas_en_casa',
    'todos_de_acuerdo',
    'composicion_familiar',
    
    // Animales
    'tiene_otros_animales',
    'cuantos_animales',
    'animales_castrados',
    'motivo_no_castracion',
    'animales_vacunados',
    'animales_anteriores',
    
    // Planes
    'plan_vacaciones',
    'plan_embarazo_bebe',
    'plan_alergia',

    'estado',
];

protected $casts = [
    'edad' => 'integer',
    'personas_en_casa' => 'integer',
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
