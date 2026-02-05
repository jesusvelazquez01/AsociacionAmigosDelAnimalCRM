<?php

namespace App\Filament\Resources\Adoptantes\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use App\Models\Animalito;
use Barryvdh\DomPDF\Facade\Pdf;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Response;

class AdoptantesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nombre_completo')
                    ->searchable(),
                TextColumn::make('dni')
                    ->label('DNI')
                    ->searchable(),
                TextColumn::make('telefono')
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email address')
                    ->searchable(),
                TextColumn::make('calle')
                    ->label('Calle')
                    ->searchable(),
                TextColumn::make('direccion')
                    ->label('Dirección')
                    ->searchable(),
                TextColumn::make('referencia_domicilio')
                    ->searchable(),
                TextColumn::make('facebook')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('generar_contrato')
                    ->label('Generar Contrato')
                    ->icon('heroicon-o-document-text')
                    ->color('success')
                    ->form([
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
                            $adoptante = $record;
                            $pets = $adoptante->animalitos;
                            
                            if ($pets->isEmpty()) {
                                Notification::make()
                                    ->title('Error')
                                    ->body('Este adoptante no tiene animales asignados')
                                    ->danger()
                                    ->send();
                                return;
                            }
                            
                            // Usar el primer animal asignado
                            $pet = $pets->first();
                            
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
                                ->body('El contrato PDF se ha generado correctamente')
                                ->success()
                                ->send();

                            // Forzar descarga del PDF
                            return Response::streamDownload(function () use ($pdf) {
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
                    })
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
