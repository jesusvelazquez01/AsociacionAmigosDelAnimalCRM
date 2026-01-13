<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Image\Enums\Fit;

class Animalito extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'nombre',
        'slug',
        'especie',
        'raza',
        'edad',
        'fecha_ingreso',
        'genero',
        'tamaño',
        'color',
        'historia',
        'imagen_url', // Se mantiene para compatibilidad, pero usaremos media library
        'apadrinado',
        'adoptado',
        'activo',
        'estado',
    ];

    protected $casts = [
        'fecha_ingreso' => 'date',
        'apadrinado' => 'boolean',
        'adoptado' => 'boolean',
        'activo' => 'boolean',
        'estado' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->nombre);
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // MEDIA LIBRARY - COLECCIONES Y CONVERSIONES
    // ═══════════════════════════════════════════════════════════════

    /**
     * Registrar colecciones de media
     */
    public function registerMediaCollections(): void
    {
        // Colección para galería de imágenes (múltiples)
        $this->addMediaCollection('galeria')
            ->useDisk('public')
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

        // Imagen principal/destacada (una sola)
        $this->addMediaCollection('imagen_principal')
            ->useDisk('public')
            ->singleFile()
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
    }

    /**
     * Registrar conversiones de imagen
     * Genera versiones optimizadas automáticamente
     */
    public function registerMediaConversions(?Media $media = null): void
    {
        // Conversión principal a WebP (optimizada)
        $this->addMediaConversion('webp')
            ->format('webp')
            ->quality(85)
            ->width(1200)
            ->height(1200)
            ->fit(Fit::Contain)
            ->nonQueued();

        // Thumbnail pequeño para grid/lista
        $this->addMediaConversion('thumb')
            ->format('webp')
            ->quality(75)
            ->width(400)
            ->height(400)
            ->fit(Fit::Crop)
            ->nonQueued();

        // Thumbnail extra pequeño para miniaturas del carrusel
        $this->addMediaConversion('mini')
            ->format('webp')
            ->quality(70)
            ->width(150)
            ->height(150)
            ->fit(Fit::Crop)
            ->nonQueued();
    }

    // ═══════════════════════════════════════════════════════════════
    // RELACIONES
    // ═══════════════════════════════════════════════════════════════

    /**
     * Relación N:N con Padrinos
     */
    public function padrinos(): BelongsToMany
    {
        return $this->belongsToMany(Padrino::class, 'animalito_padrino')
            ->withPivot(['fecha_inicio', 'monto_mensual', 'activo', 'notas'])
            ->withTimestamps();
    }

    /**
     * Relación 1:N con Tratamientos
     */
    public function tratamientos(): HasMany
    {
        return $this->hasMany(Tratamiento::class);
    }

    /**
     * Relación 1:N con Vacunas
     */
    public function vacunas(): HasMany
    {
        return $this->hasMany(Vacuna::class);
    }

    // ═══════════════════════════════════════════════════════════════
    // MÉTODOS Y ACCESSORS
    // ═══════════════════════════════════════════════════════════════

    /**
     * Obtener URL de imagen principal (compatibilidad con campo antiguo)
     */
    public function getImagenPrincipalUrlAttribute(): ?string
    {
        // Primero intentar media library
        $media = $this->getFirstMedia('imagen_principal');
        if ($media) {
            return $media->getUrl('webp');
        }

        // Fallback al campo antiguo
        return $this->imagen_url 
            ? asset('storage/' . $this->imagen_url) 
            : null;
    }

    /**
     * Obtener todas las imágenes de la galería como array
     */
    public function getGaleriaUrlsAttribute(): array
    {
        $media = $this->getMedia('galeria');
        
        if ($media->isEmpty()) {
            // Si no hay galería pero hay imagen principal, usarla
            $principal = $this->imagen_principal_url;
            return $principal ? [$principal] : [];
        }

        return $media->map(function ($item) {
            return [
                'id' => $item->id,
                'original' => $item->getUrl(),
                'webp' => $item->getUrl('webp'),
                'thumb' => $item->getUrl('thumb'),
                'mini' => $item->getUrl('mini'),
            ];
        })->toArray();
    }

    /**
     * Accessor para URL completa de imagen (compatibilidad)
     */
    public function getImagenUrlComputedAttribute(): ?string
    {
        return $this->imagen_principal_url;
    }

    /**
     * Actualiza si el animalito está en tratamiento activo
     */
    public function actualizarEstadoPorTratamiento(): void
    {
        $tieneTratamientoActivo = $this->tratamientos()
            ->where('estado', 'En curso')
            ->exists();
    }

    /**
     * Verifica si tiene alguna vacuna que necesita refuerzo pronto
     */
    public function tieneVacunasPendientes(): bool
    {
        return $this->vacunas()
            ->whereNotNull('fecha_proxima')
            ->where('fecha_proxima', '<=', now()->addDays(30))
            ->exists();
    }
}

