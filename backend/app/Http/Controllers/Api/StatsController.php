<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Animalito;
use App\Models\Padrino;
use App\Models\Mensaje;
use App\Models\Adoptante;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    /**
     * Obtener estadísticas generales para el dashboard
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'animalitos' => Animalito::where('activo', true)->count(),
            'padrinos' => Padrino::where('activo', true)->count(),
            'adoptados' => Animalito::where('adoptado', true)->count(),
            'mensajes' => Mensaje::noLeidos()->count(),
            'adoptantes' => Adoptante::count(),
        ]);
    }
}
