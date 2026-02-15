<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Animalito;
use Illuminate\Http\JsonResponse;

class AnimalitoController extends Controller
{
    /**
     * Listar animalitos activos para el frontend (adopción)
     * Soporta paginación y filtros por query params
     */
    public function index(): JsonResponse
    {
        $query = Animalito::query()
            ->with('media')
            ->where('estado', true)
            ->where('activo', true)
            ->where('adoptado', false);

        // Filtro por género
        if (request()->has('genero') && request('genero') !== 'Todos') {
            $query->where('genero', request('genero'));
        }

        // Filtro por tamaño
        if (request()->has('tamaño') && request('tamaño') !== 'Todos') {
            $query->where('tamaño', request('tamaño'));
        }

        // Filtro por especie
        if (request()->has('especie') && request('especie') !== 'Todos') {
            $query->where('especie', request('especie'));
        }

        // Búsqueda por nombre (case-insensitive)
        if (request()->has('buscar') && request('buscar') !== '') {
            $query->whereRaw('LOWER(nombre) LIKE ?', ['%' . strtolower(request('buscar')) . '%']);
        }

        // Paginación (12 por página por defecto)
        $perPage = request('per_page', 12);
        $animalitos = $query->orderBy('created_at', 'desc')->paginate($perPage);

        // Transformar datos
        $data = $animalitos->getCollection()->map(function ($animalito) {
            $primeraImagen = $this->getPrimeraImagen($animalito);

            return [
                'id' => $animalito->id,
                'name' => $animalito->nombre,
                'slug' => $animalito->slug,
                'age' => $animalito->edad ? "{$animalito->edad} años" : 'Desconocida',
                'description' => strip_tags($animalito->historia) ?? 'Sin descripción',
                'gender' => $animalito->genero ?? 'Desconocido',
                'size' => $animalito->tamaño ?? 'Mediano',
                'type' => $animalito->especie ?? 'Otro',
                'breed' => $animalito->raza ?? 'Mestizo',
                'color' => $animalito->color ?? '',
                'status' => $animalito->adoptado ? 'Adoptado' : 'Disponible',
                'image' => $primeraImagen,
            ];
        });

        return response()->json([
            'data' => $data,
            'meta' => [
                'current_page' => $animalitos->currentPage(),
                'last_page' => $animalitos->lastPage(),
                'per_page' => $animalitos->perPage(),
                'total' => $animalitos->total(),
                'from' => $animalitos->firstItem(),
                'to' => $animalitos->lastItem(),
            ]
        ]);
    }

    /**
     * Obtener un animalito por slug con galería completa
     */
    public function show(string $slug): JsonResponse
    {
        $animalito = Animalito::with('media')
            ->where('slug', $slug)
            ->where('estado', true)
            ->firstOrFail();

        return response()->json([
            'id' => $animalito->id,
            'name' => $animalito->nombre,
            'slug' => $animalito->slug,
            'age' => $animalito->edad ? "{$animalito->edad} años" : 'Desconocida',
            'description' => $animalito->historia ?? 'Sin descripción',
            'gender' => $animalito->genero ?? 'Desconocido',
            'size' => $animalito->tamaño ?? 'Mediano',
            'type' => $animalito->especie ?? 'Otro',
            'breed' => $animalito->raza ?? 'Mestizo',
            'color' => $animalito->color ?? '',
            'status' => $animalito->adoptado ? 'Adoptado' : 'Disponible',
            'image' => $this->getPrimeraImagen($animalito),
            'gallery' => $this->getGaleria($animalito),
            'vaccinated' => $animalito->vacunas()->count() > 0,
            'in_treatment' => $animalito->tratamientos()->where('estado', 'En curso')->exists(),
        ]);
    }

    /**
     * Obtener la primera imagen del animalito
     */
    private function getPrimeraImagen(Animalito $animalito): ?string
    {
        // Primero intentar media library
        $media = $animalito->getFirstMedia('galeria');
        if ($media) {
            return $media->getUrl('webp');
        }

        // Fallback al campo antiguo imagen_url
        if ($animalito->imagen_url) {
            return asset('storage/' . $animalito->imagen_url);
        }

        return null;
    }

    /**
     * Obtener la galería completa de imágenes
     */
    private function getGaleria(Animalito $animalito): array
    {
        $media = $animalito->getMedia('galeria');
        
        if ($media->isEmpty()) {
            // Fallback: usar campo antiguo si existe
            if ($animalito->imagen_url) {
                return [[
                    'id' => 0,
                    'original' => asset('storage/' . $animalito->imagen_url),
                    'webp' => asset('storage/' . $animalito->imagen_url),
                    'thumb' => asset('storage/' . $animalito->imagen_url),
                    'mini' => asset('storage/' . $animalito->imagen_url),
                ]];
            }
            return [];
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
}


