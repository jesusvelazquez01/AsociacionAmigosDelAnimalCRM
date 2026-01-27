<?php

namespace App\Filament\Widgets;

use App\Models\Animalito;
use Filament\Actions\BulkActionGroup;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Columns\TextColumn;
use Carbon\Carbon;
class AnimalitoProximoWidget extends TableWidget
{
    public function table(Table $table): Table
    {
        return $table
            ->query(fn (): Builder =>
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
                    ->label('Próximo tratamiento')
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
