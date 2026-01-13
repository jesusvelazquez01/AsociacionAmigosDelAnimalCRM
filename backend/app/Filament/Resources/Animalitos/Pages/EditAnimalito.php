<?php

namespace App\Filament\Resources\Animalitos\Pages;

use App\Filament\Resources\Animalitos\AnimalitoResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditAnimalito extends EditRecord
{
    protected static string $resource = AnimalitoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
