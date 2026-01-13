<?php

use App\Http\Controllers\Api\AnimalitoController;
use App\Http\Controllers\Api\MensajeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rutas públicas para el frontend
Route::get('/rescataditos', [AnimalitoController::class, 'index']);
Route::get('/rescataditos/{slug}', [AnimalitoController::class, 'show']);

// Ruta para mensajes de contacto
Route::post('/mensajes', [MensajeController::class, 'store']);


