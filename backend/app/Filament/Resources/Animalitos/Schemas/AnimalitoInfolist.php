<?php

namespace App\Filament\Resources\Animalitos\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\SpatieMediaLibraryImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class AnimalitoInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Información del Animalito')
                    ->tabs([
                        // ===== TAB 1: INFORMACIÓN BÁSICA =====
                        Tab::make('Información Básica')
                            ->icon('heroicon-m-identification')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextEntry::make('nombre')
                                            ->label('Nombre')
                                            ->size('lg')
                                            ->weight('bold'),
                                        TextEntry::make('especie')
                                            ->label('Especie')
                                            ->badge()
                                            ->color(fn (string $state): string => match ($state) {
                                                'Perro' => 'info',
                                                'Gato' => 'warning',
                                                default => 'gray',
                                            }),
                                        TextEntry::make('raza')
                                            ->label('Raza')
                                            ->placeholder('Sin especificar'),
                                        TextEntry::make('edad')
                                            ->label('Edad')
                                            ->suffix(' años'),
                                        TextEntry::make('genero')
                                            ->label('Género'),
                                        TextEntry::make('tamaño')
                                            ->label('Tamaño'),
                                        TextEntry::make('color')
                                            ->label('Color')
                                            ->placeholder('Sin especificar'),
                                        TextEntry::make('fecha_ingreso')
                                            ->label('Fecha de Ingreso')
                                            ->date('d/m/Y'),
                                    ])
                                    ->columns(4),
                            ]),

                        // ===== TAB 2: GALERÍA DE IMÁGENES =====
                        Tab::make('Galería')
                            ->icon('heroicon-m-photo')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        SpatieMediaLibraryImageEntry::make('galeria')
                                            ->collection('galeria')
                                            ->conversion('webp')
                                            ->size(200)
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        // ===== TAB 3: HISTORIA =====
                        Tab::make('Historia')
                            ->icon('heroicon-m-document-text')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextEntry::make('historia')
                                            ->label('')
                                            ->html()
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        // ===== TAB 4: ESTADOS =====
                        Tab::make('Estado')
                            ->icon('heroicon-m-cog-6-tooth')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        IconEntry::make('estado')
                                            ->label('Visible en web')
                                            ->boolean(),
                                        IconEntry::make('apadrinado')
                                            ->label('Apadrinado')
                                            ->boolean(),
                                        IconEntry::make('adoptado')
                                            ->label('Adoptado')
                                            ->boolean(),
                                        IconEntry::make('activo')
                                            ->label('En el refugio')
                                            ->boolean(),
                                    ])
                                    ->columns(4),
                            ]),
                    ])
                    ->columnSpanFull()->vertical(),
            ]);
    }
}

