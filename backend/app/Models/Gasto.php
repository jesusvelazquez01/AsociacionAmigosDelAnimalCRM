<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Gasto extends Model
{
    protected $fillable = [
        'concepto',
        'descripcion',
        'monto',
        'fecha',
        'categoria',
    ];

    protected $casts = [
        'fecha' => 'date',
        'monto' => 'decimal:2',
    ];

    /**
     * Scope para gastos del mes actual
     */
    public function scopeDelMesActual(Builder $query): Builder
    {
        return $query->whereMonth('fecha', now()->month)
                     ->whereYear('fecha', now()->year);
    }

    /**
     * Scope para filtrar por categoría
     */
    public function scopeDeCategoria(Builder $query, string $categoria): Builder
    {
        return $query->where('categoria', $categoria);
    }
}
