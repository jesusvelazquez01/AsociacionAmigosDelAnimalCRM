<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Animalito;
use App\Models\Adoptante;

class AdoptionContractController extends Controller
{
    public function generateContract(Request $request)
    {
        // Obtener los datos del animal y adoptante
        $petId = $request->input('pet_id');
        $adoptanteId = $request->input('adoptante_id');
        
        $pet = Animalito::findOrFail($petId);
        $adoptante = Adoptante::findOrFail($adoptanteId);
        
        // Datos adicionales del contrato
        $contractData = [
            'fecha' => now()->format('d/m/Y'),
            'tipo_adopcion' => $request->input('tipo_adopcion', 'Adopción Responsable'),
            'compensacion' => $request->input('compensacion', ''),
            'multa' => $request->input('multa', ''),
            'responsable_nombre' => $request->input('responsable_nombre', ''),
        ];

        $data = [
            'pet' => $pet,
            'adoptante' => $adoptante,
            'contract' => $contractData
        ];

        // Generar el PDF
        $pdf = Pdf::loadView('contracts.adoption', $data);
        $pdf->setPaper('A4', 'portrait');

        // Nombre del archivo
        $filename = 'contrato_adopcion_' . $pet->nombre . '_' . $adoptante->nombre_completo . '_' . now()->format('Y-m-d') . '.pdf';

        return $pdf->download($filename);
    }
}