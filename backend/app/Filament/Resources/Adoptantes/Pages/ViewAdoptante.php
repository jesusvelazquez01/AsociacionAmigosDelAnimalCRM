<?php

namespace App\Filament\Resources\Adoptantes\Pages;

use App\Filament\Resources\Adoptantes\AdoptanteResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewAdoptante extends ViewRecord
{
    protected static string $resource = AdoptanteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
