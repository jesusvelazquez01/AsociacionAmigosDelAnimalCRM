<?php

namespace App\Filament\Resources\Adoptantes\Schemas;

use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class AdoptanteForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Información Personal')
                    ->description('Datos personales del adoptante')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('nombre_completo')
                                    ->label('Nombre Completo')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Juan Pérez'),
                                
                                TextInput::make('dni')
                                    ->label('DNI')
                                    ->numeric()
                                    ->maxLength(20)
                                    ->placeholder('12345678'),
                                
                                TextInput::make('telefono')
                                    ->label('Teléfono')
                                    ->tel()
                                    ->required()
                                    ->maxLength(20)
                                    ->placeholder('+54 9 388 1234-5678'),
                                
                                TextInput::make('email')
                                    ->label('Correo Electrónico')
                                    ->email()
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('ejemplo@correo.com'),
                                
                                TextInput::make('facebook')
                                    ->label('Facebook')
                                    ->maxLength(255)
                                    ->placeholder('facebook.com/usuario')
                                    ->prefixIcon('heroicon-o-link'),
                            ]),
                    ]),

                Section::make('Domicilio')
                    ->description('Dirección completa del adoptante')
                    ->schema([
                        TextInput::make('domicilio')
                            ->label('Domicilio (Localidad/Ciudad)')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('San Salvador de Jujuy'),
                        
                        Grid::make(3)
                            ->schema([
                                TextInput::make('direccion')
                                    ->label('Calle')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Av. Belgrano')
                                    ->columnSpan(2),
                                
                                TextInput::make('numero')
                                    ->label('Número')
                                    ->numeric()
                                    ->maxLength(10)
                                    ->placeholder('1234'),
                            ]),
                        
                        Grid::make(3)
                            ->schema([
                                TextInput::make('piso')
                                    ->label('Piso')
                                    ->maxLength(10)
                                    ->placeholder('3'),
                                
                                TextInput::make('puerta')
                                    ->label('Depto/Puerta')
                                    ->maxLength(10)
                                    ->placeholder('A'),
                            ]),
                            Grid:: make(1)
                            ->schema([
                                TextInput::make('referencia_domicilio')
                                    ->label('Referencia')
                                    ->maxLength(255)
                                    ->placeholder('Frente a la plaza'),
                            ]),
                    ]),
            Section::make('Rescataditos a adoptar')
            ->description('Seleccionar los rescataditos que desea adoptar')
            ->schema([
                Select::make('animalito_id')
                ->relationship('animalitos', 'nombre')
                ->multiple()
                ->preload()
                ->searchable()
                ->required(),
                
            ]),
            ]);
    }
}