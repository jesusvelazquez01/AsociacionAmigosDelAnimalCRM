<?php

namespace App\Filament\Resources\Adoptantes\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
 use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use App\Models\Adoptante;

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
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
