<?php

namespace App\Filament\Resources\Mensajes\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class MensajeInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Remitente')
                    ->icon('heroicon-m-user')
                    ->schema([
                        TextEntry::make('nombre')
                            ->label('Nombre'),
                        TextEntry::make('apellido')
                            ->label('Apellido'),
                        TextEntry::make('email')
                            ->label('Email')
                            ->icon('heroicon-o-envelope')
                            ->copyable(),
                        TextEntry::make('telefono')
                            ->label('Teléfono')
                            ->icon('heroicon-o-phone')
                            ->placeholder('No proporcionado'),
                    ])->columns(4),

                Section::make('Mensaje')
                    ->icon('heroicon-m-chat-bubble-left-right')
                    ->schema([
                        TextEntry::make('asunto')
                            ->label('Asunto')
                            ->size('lg')
                            ->weight('bold')
                            ->columnSpanFull(),
                        TextEntry::make('mensaje')
                            ->label('')
                            ->prose()
                            ->columnSpanFull(),
                    ]),

                Section::make('Estado')
                    ->icon('heroicon-m-clipboard-document-check')
                    ->schema([
                        IconEntry::make('leido')
                            ->label('Leído')
                            ->boolean()
                            ->trueIcon('heroicon-o-envelope-open')
                            ->falseIcon('heroicon-o-envelope'),
                        TextEntry::make('respondido_at')
                            ->label('Respondido')
                            ->dateTime('d/m/Y H:i')
                            ->placeholder('Sin responder'),
                        TextEntry::make('created_at')
                            ->label('Recibido')
                            ->dateTime('d/m/Y H:i'),
                    ])->columns(3),
            ]);
    }
}

