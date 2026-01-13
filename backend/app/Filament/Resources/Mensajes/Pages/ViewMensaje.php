<?php

namespace App\Filament\Resources\Mensajes\Pages;

use App\Filament\Resources\Mensajes\MensajeResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewMensaje extends ViewRecord
{
    protected static string $resource = MensajeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
