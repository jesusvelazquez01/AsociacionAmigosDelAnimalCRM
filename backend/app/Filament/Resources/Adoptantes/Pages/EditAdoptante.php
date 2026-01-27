<?php

namespace App\Filament\Resources\Adoptantes\Pages;

use App\Filament\Resources\Adoptantes\AdoptanteResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditAdoptante extends EditRecord
{
    protected static string $resource = AdoptanteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
