<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdoptanteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try{
            $validated = $request->validate([
                'nombre_completo' => 'required|string|min:5|max:150',
                'telefono' => 'required|string|min:5|max:150',
                'email' => 'required|email|max:150',
                'barrio' => 'required|string|min:5|max:150',
                'calle' => 'required|string|min:5|max:150',
                'numero' => 'required|string|min:5|max:150',
                'piso' => 'nullable|string|min:5|max:150',
                'puerta' => 'nullable|string|min:5|max:150',
                'referencia_domicilio' => 'nullable|string|min:5|max:150',
                'facebook' => 'nullable|string|min:5|max:150',
            ],
            );

        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al procesar tu mensaje. Por favor, intenta nuevamente.',
            ], 500);
        }





    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
