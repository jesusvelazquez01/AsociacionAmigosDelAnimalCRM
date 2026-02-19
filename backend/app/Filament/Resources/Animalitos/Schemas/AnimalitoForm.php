<?php

namespace App\Filament\Resources\Animalitos\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Illuminate\Support\Str;

class AnimalitoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Wizard::make([
                    // ===== PASO 1: INFORMACIÓN BÁSICA =====
                    Step::make('Información Básica')
                        ->icon('heroicon-m-identification')
                        ->description('Datos principales del animalito')
                        ->schema([
                            TextInput::make('nombre')
                                ->required()
                                ->maxLength(255)
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn ($state, $set) => $set('slug', Str::slug($state))),

                            TextInput::make('slug')
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->disabled()
                                ->dehydrated(),

                            Select::make('especie')
                                ->label('Especie')
                                ->options([
                                    'Perro' => 'Perro',
                                    'Gato' => 'Gato',
                                    'Otro' => 'Otro',
                                ])
                                ->required()
                                ->native(false),

                            TextInput::make('raza')
                                ->label('Raza')
                                ->maxLength(255),

                            TextInput::make('edad')
                                ->label('Edad (años)')
                                ->numeric()
                                ->minValue(0)
                                ->maxValue(30),

                            DatePicker::make('fecha_ingreso')
                                ->label('Fecha de Ingreso')
                                ->native(false)
                                ->default(now()),

                            Select::make('genero')
                                ->label('Género')
                                ->options([
                                    'Macho' => 'Macho',
                                    'Hembra' => 'Hembra',
                                ])
                                ->required()
                                ->native(false),

                            Select::make('tamaño')
                                ->label('Tamaño')
                                ->options([
                                    'Pequeño' => 'Pequeño',
                                    'Mediano' => 'Mediano',
                                    'Grande' => 'Grande',
                                ])
                                ->native(false),

                            TextInput::make('color')
                                ->label('Color')
                                ->maxLength(255),
                        ])
                        ->columns(2),

                    // ===== PASO 2: GALERÍA DE IMÁGENES =====
                    Step::make('Galería de Imágenes')
                        ->icon('heroicon-m-photo')
                        ->description('Fotos del animalito')
                        ->schema([
                            SpatieMediaLibraryFileUpload::make('galeria')
                                ->collection('galeria')
                                ->label('Fotos del animalito')
                                ->multiple()
                                ->reorderable()
                                ->maxFiles(10)
                                ->image()
                                ->imageEditor()
                                ->imageEditorAspectRatios([
                                    null,
                                    '16:9',
                                    '4:3',
                                    '1:1',
                                ])
                                ->helperText('Máximo 10 imágenes. Arrastra para reordenar. Se convertirán automáticamente a WebP.')
                                ->columnSpanFull(),
                        ]),

                    // ===== PASO 3: DESCRIPCIÓN =====
                    Step::make('Descripción')
                        ->icon('heroicon-m-document-text')
                        ->description('Historia y descripción del animalito')
                        ->schema([
                            RichEditor::make('historia')
                                ->label('Historia / Descripción')
                                ->helperText('Historia del animalito.')
                                ->toolbarButtons([
                                    'bold',
                                    'italic',
                                    'bulletList',
                                    'orderedList',
                                    'alignJustify',
                                    'h2',
                                    'h3',
                                    'link',
                                    'undo',
                                    'redo'
                                ])
                                ->columnSpanFull(),

                            Toggle::make('estado')
                                ->label('Visible en la web')
                                ->default(true)
                                ->helperText('Si está activo, se mostrará en el sitio web')
                                ->columnSpanFull(),
                        ]),

                    // ===== PASO 4: ESTADO =====
                    Step::make('Estado')
                        ->icon('heroicon-m-cog-6-tooth')
                        ->description('Estado actual del animalito en el refugio')
                        ->schema([
                            Toggle::make('apadrinado')
                                ->label('Apadrinado')
                                ->default(false),

                            Toggle::make('adoptado')
                                ->label('Adoptado')
                                ->default(false),

                            Toggle::make('activo')
                                ->label('En el refugio')
                                ->default(true)
                                ->helperText('Si está activo, el animal sigue en el refugio'),
                        ])
                        ->columns(3),
                ])
                ->columnSpanFull()
                ->skippable()
            ]);
    }
}
