<?php

namespace App\Filament\Resources\Adoptantes\Pages;

use App\Filament\Resources\Adoptantes\AdoptanteResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAdoptantes extends ListRecords
{
    protected static string $resource = AdoptanteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
