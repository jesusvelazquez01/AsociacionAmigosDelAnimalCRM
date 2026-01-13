<?php

namespace App\Filament\Resources\Padrinos\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PadrinoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nombre')
                    ->required(),
                TextInput::make('apellido')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('telefono')
                    ->tel(),
                DatePicker::make('fecha_nacimiento'),
                TextInput::make('genero'),
                TextInput::make('direccion'),
                TextInput::make('ciudad'),
                TextInput::make('provincia'),
                TextInput::make('pais')
                    ->required()
                    ->default('Argentina'),
                TextInput::make('codigo_postal'),
                Toggle::make('activo')
                    ->required(),
                Textarea::make('notas')
                    ->columnSpanFull(),
            ]);
    }
}
