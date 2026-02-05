<?php

use App\Http\Controllers\Api\AnimalitoController;
use App\Http\Controllers\Api\MensajeController;
use App\Http\Controllers\Api\StatsController;
use App\Http\Controllers\AdoptionContractController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Estadísticas públicas para dashboard
Route::get('/stats', [StatsController::class, 'index']);

// Rutas públicas para el frontend
Route::get('/rescataditos', [AnimalitoController::class, 'index']);
Route::get('/rescataditos/{slug}', [AnimalitoController::class, 'show']);

// Ruta para mensajes de contacto
Route::post('/mensajes', [MensajeController::class, 'store']);
Route::post('/adoptantes', [AdoptanteController::class, 'store']);

// Ruta para generar contrato de adopción
Route::post('/contrato-adopcion', [AdoptionContractController::class, 'generateContract']);


