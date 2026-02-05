<?php

namespace App\Filament\Actions;

use Filament\Actions\Action;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use App\Models\Animalito;
use Barryvdh\DomPDF\Facade\Pdf;
use Filament\Notifications\Notification;

class GenerateContractAction
{
    public static function make(): Action
    {
        return Action::make('generar_contrato')
            ->label('Generar Contrato')
            ->icon('heroicon-o-document-text')
            ->color('success')
            ->form([
                Select::make('pet_id')
                    ->label('Seleccionar Animal')
                    ->options(function () {
                        return Animalito::where('estado', 'Disponible')
                            ->pluck('nombre', 'id')
                            ->toArray();
                    })
                    ->required()
                    ->searchable(),
                TextInput::make('tipo_adopcion')
                    ->label('Tipo de Adopción')
                    ->default('Adopción Responsable')
                    ->required(),
                TextInput::make('responsable_nombre')
                    ->label('Nombre del Responsable')
                    ->placeholder('Nombre de quien firma por la entidad')
                    ->required(),
                TextInput::make('compensacion')
                    ->label('Compensación (ARS)')
                    ->numeric()
                    ->placeholder('10000'),
                TextInput::make('multa')
                    ->label('Multa por Retractación (ARS)')
                    ->numeric()
                    ->placeholder('15000'),
            ])
            ->action(function (array $data, $record) {
                try {
                    $pet = Animalito::findOrFail($data['pet_id']);
                    $adoptante = $record;
                    
                    $contractData = [
                        'fecha' => now()->format('d/m/Y'),
                        'tipo_adopcion' => $data['tipo_adopcion'],
                        'compensacion' => $data['compensacion'] ?? '',
                        'multa' => $data['multa'] ?? '',
                        'responsable_nombre' => $data['responsable_nombre'],
                    ];

                    $pdfData = [
                        'pet' => $pet,
                        'adoptante' => $adoptante,
                        'contract' => $contractData
                    ];

                    $pdf = Pdf::loadView('contracts.adoption', $pdfData);
                    $pdf->setPaper('A4', 'portrait');

                    $filename = 'contrato_adopcion_' . $pet->nombre . '_' . $adoptante->nombre_completo . '_' . now()->format('Y-m-d') . '.pdf';

                    Notification::make()
                        ->title('Contrato generado')
                        ->body('El contrato se ha generado correctamente')
                        ->success()
                        ->send();

                    return response()->streamDownload(function () use ($pdf) {
                        echo $pdf->output();
                    }, $filename, [
                        'Content-Type' => 'application/pdf',
                    ]);

                } catch (\Exception $e) {
                    Notification::make()
                        ->title('Error')
                        ->body('Error al generar el contrato: ' . $e->getMessage())
                        ->danger()
                        ->send();
                }
            });
    }
}