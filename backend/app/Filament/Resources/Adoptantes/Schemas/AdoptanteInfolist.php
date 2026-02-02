<?php

namespace App\Filament\Resources\Adoptantes\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\Section;
use Filament\Schemas\Schema;

class AdoptanteInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // Datos Personales
                Section::make('Datos Personales')
                    ->icon('heroicon-m-user')
                    ->schema([
                        TextEntry::make('nombre_completo')
                            ->label('Nombre Completo'),
                        TextEntry::make('edad')
                            ->label('Edad')
                            ->suffix(' años'),
                        TextEntry::make('telefono')
                            ->label('Teléfono'),
                        TextEntry::make('email')
                            ->label('Email'),
                        TextEntry::make('domicilio')
                            ->label('Domicilio'),
                        TextEntry::make('localidad')
                            ->label('Localidad'),
                        TextEntry::make('facebook')
                            ->label('Facebook')
                            ->url(fn ($state) => $state)
                            ->openUrlInNewTab(),
                    ])
                    ->columns(2),

                // Información del Hogar
                Section::make('Información del Hogar')
                    ->icon('heroicon-m-home')
                    ->schema([
                        TextEntry::make('personas_en_casa')
                            ->label('Personas en casa')
                            ->suffix(' personas'),
                        TextEntry::make('todos_de_acuerdo')
                            ->label('Todos de acuerdo')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'si' => 'success',
                                'no' => 'danger',
                                'tal_vez' => 'warning',
                                default => 'gray',
                            }),
                        TextEntry::make('composicion_familiar')
                            ->label('Composición familiar')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                // Otros Animales
                Section::make('Otros Animales')
                    ->icon('heroicon-m-heart')
                    ->schema([
                        TextEntry::make('tiene_otros_animales')
                            ->label('Tiene otros animales')
                            ->badge()
                            ->color(fn (string $state): string => $state === 'si' ? 'success' : 'gray'),
                        TextEntry::make('cuantos_animales')
                            ->label('Descripción de sus animales')
                            ->columnSpanFull(),
                        TextEntry::make('animales_castrados')
                            ->label('Castrados')
                            ->badge()
                            ->color(fn (?string $state): string => $state === 'si' ? 'success' : 'warning'),
                        TextEntry::make('motivo_no_castracion')
                            ->label('Motivo no castración'),
                        TextEntry::make('animales_vacunados')
                            ->label('Vacunados')
                            ->badge()
                            ->color(fn (?string $state): string => $state === 'si' ? 'success' : 'warning'),
                        TextEntry::make('animales_anteriores')
                            ->label('Animales anteriores')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                // Planes Futuros
                Section::make('Planes Futuros')
                    ->icon('heroicon-m-clock')
                    ->schema([
                        TextEntry::make('plan_vacaciones')
                            ->label('Plan para vacaciones')
                            ->columnSpanFull(),
                        TextEntry::make('plan_embarazo_bebe')
                            ->label('Plan si llega un bebé')
                            ->columnSpanFull(),
                        TextEntry::make('plan_alergia')
                            ->label('Plan si hay alergia')
                            ->columnSpanFull(),
                    ]),

                // Metadata
                Section::make('Información del Registro')
                    ->icon('heroicon-m-document-text')
                    ->schema([
                        TextEntry::make('created_at')
                            ->label('Fecha de solicitud')
                            ->dateTime('d/m/Y H:i'),
                        TextEntry::make('updated_at')
                            ->label('Última actualización')
                            ->dateTime('d/m/Y H:i'),
                    ])
                    ->columns(2)
                    ->collapsed(),
            ]);
    }
}
