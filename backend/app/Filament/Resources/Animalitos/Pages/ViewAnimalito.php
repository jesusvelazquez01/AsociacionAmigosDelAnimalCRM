<?php

namespace App\Filament\Resources\Animalitos\Pages;

use App\Filament\Resources\Animalitos\AnimalitoResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewAnimalito extends ViewRecord
{
    protected static string $resource = AnimalitoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
