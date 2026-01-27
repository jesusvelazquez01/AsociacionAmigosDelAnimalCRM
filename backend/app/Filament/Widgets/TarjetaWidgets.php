<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Animalito;
use Filament\Support\Enums\IconPosition;
class TarjetaWidgets extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make ('Animalitos', Animalito::count())
            ->description('Total de refugiados')
            ->descriptionIcon('heroicon-o-plus', IconPosition::Before)
            ->color('primary'),
            Stat::make ('Apadrinados', Animalito::where('apadrinado', true)->count())
            ->description('Total de apadrinados en el refugio')
            ->descriptionIcon('heroicon-o-heart', IconPosition::Before)
            ->color('success'),
            Stat::make ('Adoptados', Animalito::where('adoptado', true)->count())
            ->description('Total de adoptados del refugio')
            ->descriptionIcon('heroicon-o-heart', IconPosition::Before)
            ->color('danger'),










        ];
    }
}
