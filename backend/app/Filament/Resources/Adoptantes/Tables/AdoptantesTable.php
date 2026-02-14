<?php

namespace App\Filament\Resources\Adoptantes\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Notifications\Notification;
use App\Models\Adoptante;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Response;

class AdoptantesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nombre_completo')
                    ->label('Nombre')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('edad')
                    ->label('Edad')
                    ->suffix(' años')
                    ->sortable(),
                TextColumn::make('telefono')
                    ->label('Teléfono')
                    ->searchable(),
                TextColumn::make('localidad')
                    ->label('Localidad')
                    ->searchable(),
                TextColumn::make('domicilio')
                    ->label('Domicilio')
                    ->url(fn (Adoptante $record): string => 
                        'https://www.google.com/maps/search/' . urlencode($record->domicilio . ', ' . $record->localidad)
                    )
                    ->openUrlInNewTab()
                    ->icon('heroicon-o-map-pin')
                    ->copyable(),
                TextColumn::make('tiene_otros_animales')
                    ->label('Tiene mascotas')
                    ->badge()
                    ->color(fn (string $state): string => $state === 'si' ? 'success' : 'gray'),
                TextColumn::make('estado')
                    ->label('Estado')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pendiente' => 'warning',
                        'en_revision' => 'info',
                        'aprobado' => 'success',
                        'rechazado' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('animalitos.nombre')
                    ->label('Animalitos')
                    ->badge()
                    ->searchable()
                    ->separator(','),
                TextColumn::make('created_at')
                    ->label('Fecha')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('whatsapp')
                    ->icon('heroicon-o-phone')
                    ->color('success')
                    ->url(fn (Adoptante $record): string => 
                        'https://wa.me/' . preg_replace('/[^0-9]/', '', $record->telefono)
                    )
                    ->openUrlInNewTab(),
                Action::make('generar_contrato')
                    ->label('Generar Contrato')
                    ->icon('heroicon-o-document-text')
                    ->color('primary')
                    ->form([
                        TextInput::make('tipo_adopcion')
                            ->label('Tipo de Adopción')
                            ->default('Adopción Responsable')
                            ->required(),
                        Select::make('responsable_nombre')
                            ->label('Nombre del Responsable')
                            ->options([
                                'Juan Perez' => 'Juan Perez',
                                'Maria Lopez' => 'Maria Lopez',
                                'Pedro Ramirez' => 'Pedro Ramirez',
                            ])
                            ->placeholder('Nombre de quien firma por la entidad')
                            ->required(),
                    ])
                    ->action(function (array $data, Adoptante $record) {
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
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
