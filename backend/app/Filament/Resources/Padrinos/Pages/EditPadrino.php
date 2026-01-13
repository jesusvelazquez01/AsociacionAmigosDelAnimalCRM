<?php

namespace App\Filament\Resources\Padrinos\Pages;

use App\Filament\Resources\Padrinos\PadrinoResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditPadrino extends EditRecord
{
    protected static string $resource = PadrinoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
