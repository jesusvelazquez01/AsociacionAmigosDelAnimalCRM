<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Mensaje extends Model
{
    protected $fillable = [
        'nombre',
        'apellido',
        'email',
        'telefono',
        'asunto',
        'mensaje',
        'leido',
        'respondido_at',
    ];

    protected $casts = [
        'leido' => 'boolean',
        'respondido_at' => 'datetime',
    ];

    // ═══════════════════════════════════════════════════════════════
    // SCOPES
    // ═══════════════════════════════════════════════════════════════

    /**
     * Scope para mensajes no leídos
     */
    public function scopeNoLeidos(Builder $query): Builder
    {
        return $query->where('leido', false);
    }

    /**
     * Scope para mensajes sin responder
     */
    public function scopeSinResponder(Builder $query): Builder
    {
        return $query->whereNull('respondido_at');
    }

    // ═══════════════════════════════════════════════════════════════
    // ACCESSORS
    // ═══════════════════════════════════════════════════════════════

    /**
     * Obtener nombre completo
     */
    public function getNombreCompletoAttribute(): string
    {
        return "{$this->nombre} {$this->apellido}";
    }
}

