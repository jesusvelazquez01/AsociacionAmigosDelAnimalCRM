<?php

namespace App\Filament\Resources\Padrinos\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class PadrinoInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('nombre')
                    ->label('Nombre completo'),

                TextEntry::make('email')
                    ->label('Email address'),
                TextEntry::make('telefono'),
                TextEntry::make('fecha_nacimiento')
                    ->date(),
                TextEntry::make('genero'),
                TextEntry::make('direccion'),
                TextEntry::make('ciudad'),
                TextEntry::make('provincia'),
                TextEntry::make('pais'),
                TextEntry::make('codigo_postal'),
                IconEntry::make('activo')
                    ->boolean(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
