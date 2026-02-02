<?php

namespace App\Filament\Resources\Adoptantes\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

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
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
