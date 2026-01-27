<?php

namespace App\Filament\Resources\Animalitos\Pages;

use App\Filament\Resources\Animalitos\AnimalitoResource;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;

class CreateAnimalito extends CreateRecord
{
    protected static string $resource = AnimalitoResource::class;

protected function getCreatedNotificationTitle(): ?string
{
    return 'Animalito creado exitosamente';
}













}
