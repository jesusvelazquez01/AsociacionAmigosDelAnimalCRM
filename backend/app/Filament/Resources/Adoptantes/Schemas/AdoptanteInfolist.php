<?php

namespace App\Filament\Resources\Adoptantes\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class AdoptanteInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('nombre_completo'),
                TextEntry::make('telefono'),
                TextEntry::make('email')
                    ->label('Email address'),
                TextEntry::make('domicilio'),
                TextEntry::make('direccion'),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
