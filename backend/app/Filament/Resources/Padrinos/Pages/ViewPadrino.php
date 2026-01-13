<?php

namespace App\Filament\Resources\Padrinos\Pages;

use App\Filament\Resources\Padrinos\PadrinoResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewPadrino extends ViewRecord
{
    protected static string $resource = PadrinoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
