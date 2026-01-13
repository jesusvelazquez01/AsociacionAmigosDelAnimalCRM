<?php

namespace App\Filament\Resources\Mensajes\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class MensajeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nombre')
                    ->required(),
                TextInput::make('apellido'),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('telefono')
                    ->tel(),
                TextInput::make('asunto')
                    ->required(),
                Textarea::make('mensaje')
                    ->required()
                    ->columnSpanFull(),
                Toggle::make('leido')
                    ->required(),
                DateTimePicker::make('respondido_at'),
            ]);
    }
}
