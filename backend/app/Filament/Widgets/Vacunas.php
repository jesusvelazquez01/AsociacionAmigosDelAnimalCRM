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
                    $q->whereBetween('fecha_aplicacion', [
                        now(),
                        now()->addDays(15),
                    ]);
                })
                    ->with(['vacunas' => function ($q) {
                        $q->orderBy('fecha_aplicacion');
                    }])
                    ->latest()
            )
            ->columns([
                TextColumn::make('vacunas.0.fecha_aplicacion')
                    ->label('Próximas vacunas')
                    ->date()

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
