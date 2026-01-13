<?php

namespace App\Filament\Resources\Animalitos\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\SpatieMediaLibraryImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class AnimalitoInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Información del Animalito')
                    ->icon('heroicon-m-heart')
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
                    ])->columns(4),

                Section::make('Galería de Imágenes')
                    ->icon('heroicon-m-photo')
                    ->schema([
                        SpatieMediaLibraryImageEntry::make('galeria')
                            ->collection('galeria')
                            ->conversion('webp')
                            ->size(200)
                            ->columnSpanFull(),
                    ]),

                Section::make('Historia')
                    ->icon('heroicon-m-document-text')
                    ->schema([
                        TextEntry::make('historia')
                            ->label('')
                            ->html()
                            ->columnSpanFull(),
                    ]),

                Section::make('Estados')
                    ->icon('heroicon-m-cog-6-tooth')
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
                    ])->columns(4),

                Section::make('Registro')
                    ->icon('heroicon-m-clock')
                    ->collapsed()
                    ->schema([
                        TextEntry::make('created_at')
                            ->label('Creado')
                            ->dateTime('d/m/Y H:i'),
                        TextEntry::make('updated_at')
                            ->label('Actualizado')
                            ->dateTime('d/m/Y H:i'),
                    ])->columns(2),
            ]);
    }
}

