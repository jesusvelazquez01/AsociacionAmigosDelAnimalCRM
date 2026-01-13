<?php

namespace App\Filament\Resources\Padrinos\Pages;

use App\Filament\Resources\Padrinos\PadrinoResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPadrinos extends ListRecords
{
    protected static string $resource = PadrinoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
