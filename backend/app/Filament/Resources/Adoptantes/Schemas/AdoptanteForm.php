<?php

namespace App\Filament\Resources\Adoptantes\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Utilities\Get;

class AdoptanteForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                
                // ===== SECCIÓN 1: DATOS PERSONALES =====
                Section::make('Datos Personales')
                    ->icon('heroicon-m-user')
                    ->description('Información básica del solicitante')
                    ->schema([
                        TextInput::make('nombre_completo')
                            ->label('Nombre Completo')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Ej: Juan Pérez'),

                        TextInput::make('email')
                            ->label('Correo Electrónico')
                            ->email()
                            ->placeholder('ejemplo@mail.com'),

                        TextInput::make('edad')
                            ->label('Edad')
                            ->required()
                            ->numeric()
                            ->minValue(18)
                            ->maxValue(100)
                            ->suffix('años')
                            ->helperText('Debe ser mayor de 18 años para adoptar'),

                        TextInput::make('telefono')
                            ->label('Teléfono')
                            ->tel()
                            ->required()
                            ->placeholder('+54 388 123 4567'),

                        TextInput::make('domicilio')
                            ->label('Domicilio')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Calle y número'),

                        TextInput::make('localidad')
                            ->label('Localidad')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Ciudad, Provincia'),

                        TextInput::make('facebook')
                            ->label('Facebook (Opcional)')
                            ->placeholder('URL de perfil de Facebook'),
                        Select::make('animalitos')
                            ->label('Animalitos')
                            ->relationship('animalitos', 'nombre')
                            ->multiple()
                            ->preload()
                            ->searchable()
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->collapsible(),

                // ===== SECCIÓN 2: COMPOSICIÓN DEL HOGAR =====
                Section::make('Información del Hogar')
                    ->icon('heroicon-m-home')
                    ->description('Información sobre tu hogar y familia')
                    ->schema([
                        TextInput::make('personas_en_casa')
                            ->label('¿Cuántas personas viven en la casa?')
                            ->required()
                            ->numeric()
                            ->minValue(1)
                            ->suffix('personas'),

                        Select::make('todos_de_acuerdo')
                            ->label('¿Están todos de acuerdo en adoptar?')
                            ->options([
                                'si' => 'Sí',
                                'no' => 'No',
                                'tal_vez' => 'Tal vez',
                            ])
                            ->required()
                            ->native(false),

                        Textarea::make('composicion_familiar')
                            ->label('Composición del núcleo familiar')
                            ->required()
                            ->rows(3)
                            ->placeholder('Ej: Pareja (35 y 32 años), 2 hijos (8 y 5 años)')
                            ->helperText('Relación y edades de las personas que viven en la casa')
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->collapsible(),

                // ===== SECCIÓN 3: OTROS ANIMALES =====
                Section::make('Otros Animales')
                    ->icon('heroicon-m-heart')
                    ->description('Información sobre tus mascotas actuales o anteriores')
                    ->schema([
                        Select::make('tiene_otros_animales')
                            ->label('¿Tenés otros animales?')
                            ->options([
                                'si' => 'Sí',
                                'no' => 'No',
                            ])
                            ->required()
                            ->native(false)
                            ->live(),

                        Textarea::make('cuantos_animales')
                            ->label('¿Cuántos? ¿Nos cuentan un poco sobre ellos?')
                            ->rows(3)
                            ->placeholder('Ej: 2 perros (Firulais de 5 años y Luna de 2 años)')
                            ->visible(fn (Get $get) => $get('tiene_otros_animales') === 'si')
                            ->columnSpanFull(),

                        Select::make('animales_castrados')
                            ->label('¿Están castrados?')
                            ->options([
                                'si' => 'Sí',
                                'no' => 'No',
                            ])
                            ->native(false)
                            ->visible(fn (Get $get) => $get('tiene_otros_animales') === 'si')
                            ->live(),

                        Textarea::make('motivo_no_castracion')
                            ->label('Si no están castrados ¿cuál es el motivo?')
                            ->rows(2)
                            ->placeholder('Explica el motivo...')
                            ->visible(fn (Get $get) => $get('animales_castrados') === 'no')
                            ->columnSpanFull(),

                        Select::make('animales_vacunados')
                            ->label('¿Están vacunados?')
                            ->options([
                                'si' => 'Sí',
                                'no' => 'No',
                            ])
                            ->native(false)
                            ->visible(fn (Get $get) => $get('tiene_otros_animales') === 'si'),

                        Textarea::make('animales_anteriores')
                            ->label('¿Tuviste otros animales? ¿Qué pasó con ellos?')
                            ->required()
                            ->rows(3)
                            ->placeholder('Cuéntanos sobre tus experiencias previas con animales...')
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->collapsible(),

                // ===== SECCIÓN 4: PLANES FUTUROS =====
                Section::make('Planes Futuros')
                    ->icon('heroicon-m-clock')
                    ->description('La adopción es un compromiso a largo plazo')
                    ->schema([
                        Textarea::make('plan_vacaciones')
                            ->label('¿Han pensado qué harán en vacaciones?')
                            ->required()
                            ->rows(3)
                            ->placeholder('Ej: Lo llevaremos con nosotros / Se quedará con familiares / Contrataremos un cuidador...')
                            ->columnSpanFull(),

                        Textarea::make('plan_embarazo_bebe')
                            ->label('¿Han pensado qué harán si hay un embarazo o llega un bebé?')
                            ->required()
                            ->rows(3)
                            ->placeholder('Explica cómo manejarías esta situación...')
                            ->columnSpanFull(),

                        Textarea::make('plan_alergia')
                            ->label('¿Han pensado qué harán si alguien desarrolla alergia?')
                            ->required()
                            ->rows(3)
                            ->placeholder('Explica cómo manejarías esta situación...')
                            ->columnSpanFull(),
                    ])
                    ->collapsible(),
                Section::make('Estado de solicitud')
                ->schema([
                    Select::make('estado')
                        ->label('Estado')
                        ->options([
                            'pendiente' => 'Pendiente',
                            'en_revision' => 'En revisión',
                            'aprobado' => 'Aprobado',
                            'rechazado' => 'Rechazado',
                        ])
                        ->required()
                        ->native(false),
                ])
                ]);
    }
}