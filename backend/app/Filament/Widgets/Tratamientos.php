<?php

namespace App\Filament\Widgets;

use App\Models\Animalito;
use Filament\Actions\BulkActionGroup;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

class Tratamientos extends TableWidget
{
    public function table(Table $table): Table
    {
        return $table
            ->query(
                fn(): Builder =>
                Animalito::whereHas('tratamientos', function ($q) {
                    $q->whereBetween('fecha_fin', [
                        now(),
                        now()->addDays(15),
                    ]);
                })
                    ->with(['tratamientos' => function ($q) {
                        $q->orderBy('fecha_fin');
                    }])
                    ->latest()
            )
            ->columns([
                TextColumn::make('tratamientos.0.fecha_fin')
                    ->label('Renovar tratamientos')
                    ->date()
                    ->color(
                        fn($record) =>
                        $record->tratamientos->first()->fecha_fin->isBefore(now()->addDays(15))
                            ? 'warning'
                            : 'success'
                    ),
                TextColumn::make('tratamientos.0.animalito.nombre')
                    ->label('Animalito'),

                TextColumn::make('tratamientos.0.nombre')
                    ->label('Tratamiento'),
                TextColumn::make('tratamientos.0.veterinario.nombre')
                    ->label('Veterinario'),

            ])
            ->filters([
                //
            ])
            ->headerActions([
                //
            ])
            ->recordActions([
                //
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    //
                ]),
            ]);
    }
}
