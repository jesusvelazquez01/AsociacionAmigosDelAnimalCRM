<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Adoptante;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Filament\Notifications\Notification;
use Filament\Actions\Action;
class AdoptanteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $adoptantes = Adoptante::with('animalitos')->latest()->get();
        
        return response()->json([
            'success' => true,
            'data' => $adoptantes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * Recibe los datos del formulario de adopción del frontend
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                // Personal
                'nombre_completo' => 'required|string|min:2|max:255',
                'email' => 'nullable|email|max:255',
                'edad' => 'required|integer|min:18|max:100',
                'telefono' => 'required|string|min:5|max:50',
                'domicilio' => 'required|string|min:3|max:255',
                'localidad' => 'required|string|min:2|max:255',
                'facebook' => 'nullable|string|max:255',
                
                // Hogar
                'personas_en_casa' => 'required|integer|min:1|max:20',
                'todos_de_acuerdo' => 'required|in:si,no,tal_vez',
                'composicion_familiar' => 'required|string|min:5|max:1000',
                
                // Animales
                'tiene_otros_animales' => 'required|in:si,no',
                'cuantos_animales' => 'nullable|string|max:1000',
                'animales_castrados' => 'nullable|in:si,no',
                'motivo_no_castracion' => 'nullable|string|max:1000',
                'animales_vacunados' => 'nullable|in:si,no',
                'animales_anteriores' => 'required|string|min:5|max:1000',
                
                // Planes
                'plan_vacaciones' => 'required|string|min:5|max:1000',
                'plan_embarazo_bebe' => 'required|string|min:5|max:1000',
                'plan_alergia' => 'required|string|min:5|max:1000',
                
                // Animalitos seleccionados (array de IDs para la relación N:N)
                'animalito_ids' => 'required|array|min:1',
                'animalito_ids.*' => 'exists:animalitos,id',
            ]);

            // Separamos los IDs de animalitos del resto de datos
            $animalitoIds = $validated['animalito_ids'];
            unset($validated['animalito_ids']);

            // Agregamos estado inicial
         $validated['estado'] = 'pendiente';

            // Creamos el adoptante
            $adoptante = Adoptante::create($validated);

            // Asociamos los animalitos (relación N:N)
            $adoptante->animalitos()->attach($animalitoIds);

            // Cargamos la relación para la respuesta
            $adoptante->load('animalitos');

            // Obtener nombres de animalitos para la notificación
            $nombresAnimalitos = $adoptante->animalitos->pluck('nombre')->join(', ');

            // Enviar notificación a todos los usuarios del panel admin
            $recipients = User::all();
            
            Notification::make()
                ->title('Nueva Solicitud de Adopción')
                ->icon('heroicon-o-heart')
                ->iconColor('success')
                ->body("**{$adoptante->nombre_completo}** quiere adoptar a: {$nombresAnimalitos}")
                ->sendToDatabase($recipients);

            return response()->json([
                'success' => true,
                'message' => '¡Tu solicitud de adopción fue enviada exitosamente! Nos pondremos en contacto contigo pronto.',
                'data' => $adoptante,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Por favor, completa todos los campos requeridos correctamente.',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

}
