<?php

namespace App\Filament\Widgets;

use App\Models\Animalito;
use Filament\Actions\BulkActionGroup;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

class Vacunas extends TableWidget
{
    public function table(Table $table): Table
    {
        return $table
            ->query(
                fn(): Builder =>
                Animalito::whereHas('vacunas', function ($q) {
                    $q->whereBetween('fecha_proxima', [
                        now(),
                        now()->addDays(15),
                    ]);
                })
                    ->with(['vacunas' => function ($q) {
                        $q->orderBy('fecha_proxima');
                    }])
                    ->latest()
            )
            ->columns([
                TextColumn::make('vacunas.0.fecha_proxima')
                    ->label('Renovar vacunas')
                    ->date(),
                TextColumn::make('vacunas.0.animalito.nombre')
                    ->label('Animalito'),
                TextColumn::make('vacunas.0.nombre')
                    ->label('Vacuna'),
                TextColumn::make('vacunas.0.veterinario.nombre')
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
