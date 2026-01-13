<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mensaje;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MensajeController extends Controller
{
    /**
     * Recibir un mensaje del formulario de contacto
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'firstName' => 'required|string|min:2|max:255',
                'lastName' => 'nullable|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:50',
                'subject' => 'required|string|min:2|max:255',
                'message' => 'required|string|min:10',
            ]);

            $mensaje = Mensaje::create([
                'nombre' => $validated['firstName'],
                'apellido' => $validated['lastName'] ?? '',
                'email' => $validated['email'],
                'telefono' => $validated['phone'] ?? null,
                'asunto' => $validated['subject'],
                'mensaje' => $validated['message'],
                'leido' => false,
            ]);

            return response()->json([
                'success' => true,
                'message' => '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
                'id' => $mensaje->id,
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al procesar tu mensaje. Por favor, intenta nuevamente.',
            ], 500);
        }
    }
}
