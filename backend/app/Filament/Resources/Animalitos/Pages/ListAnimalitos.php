<?php

namespace App\Filament\Resources\Animalitos\Pages;

use App\Filament\Resources\Animalitos\AnimalitoResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAnimalitos extends ListRecords
{
    protected static string $resource = AnimalitoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
