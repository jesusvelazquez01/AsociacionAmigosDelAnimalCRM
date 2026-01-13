<?php

namespace App\Filament\Resources\Animalitos\Tables;

use App\Models\Vacuna;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Schemas\Components\Grid;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;

class AnimalitosTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('galeria')
                    ->label('Foto')
                    ->collection('galeria')
                    ->conversion('thumb')
                    ->circular()
                    ->stacked(),

                TextColumn::make('nombre')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('especie')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Perro' => 'info',
                        'Gato' => 'warning',
                        default => 'gray',
                    }),

                TextColumn::make('raza')
                    ->searchable()
                    ->toggleable(),

                TextColumn::make('genero')
                    ->label('Género')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Macho' => 'info',
                        'Hembra' => 'danger',
                        default => 'gray',
                    }),

                TextColumn::make('edad')
                    ->label('Edad')
                    ->suffix(' años')
                    ->sortable(),

                TextColumn::make('tamaño')
                    ->toggleable(),

                IconColumn::make('activo')
                    ->label('En refugio')
                    ->boolean(),

                IconColumn::make('estado')
                    ->label('En web')
                    ->boolean(),

                TextColumn::make('created_at')
                    ->label('Creado')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('especie')
                    ->options([
                        'Perro' => 'Perro',
                        'Gato' => 'Gato',
                        'Otro' => 'Otro',
                    ]),
                TernaryFilter::make('activo')
                    ->label('En refugio'),
                TernaryFilter::make('estado')
                    ->label('En web'),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    // Bulk Action para asignar vacuna masivamente
                    BulkAction::make('asignarVacuna')
                        ->label('Asignar Vacuna')
                        ->icon('heroicon-o-beaker')
                        ->color('success')
                        ->requiresConfirmation()
                        ->modalHeading('Asignar Vacuna a Animalitos Seleccionados')
                        ->modalDescription('Esta vacuna se aplicará a todos los animalitos seleccionados.')
                        ->modalSubmitActionLabel('Asignar Vacuna')
                        ->form([
                            Grid::make(2)
                                ->schema([
                                    TextInput::make('nombre')
                                        ->label('Nombre de la vacuna')
                                        ->required()
                                        ->maxLength(255),

                                    TextInput::make('lote')
                                        ->label('Número de lote')
                                        ->maxLength(255),
                                ]),

                            Grid::make(2)
                                ->schema([
                                    DatePicker::make('fecha_aplicacion')
                                        ->label('Fecha de aplicación')
                                        ->required()
                                        ->native(false)
                                        ->displayFormat('d/m/Y')
                                        ->default(now()),

                                    DatePicker::make('fecha_proxima')
                                        ->label('Próxima aplicación')
                                        ->native(false)
                                        ->displayFormat('d/m/Y'),
                                ]),

                            Grid::make(2)
                                ->schema([
                                    Select::make('veterinario_id')
                                        ->label('Veterinario')
                                        ->options(fn () => \App\Models\Veterinario::pluck('nombre', 'id'))
                                        ->searchable()
                                        ->preload()
                                        ->createOptionForm([
                                            TextInput::make('nombre')
                                                ->label('Nombre del veterinario')
                                                ->required()
                                                ->maxLength(255),
                                        ])
                                        ->createOptionUsing(function (array $data): int {
                                            return \App\Models\Veterinario::create($data)->id;
                                        }),

                                    TextInput::make('costo')
                                        ->label('Costo por animal')
                                        ->numeric()
                                        ->prefix('$')
                                        ->default(0)
                                        ->minValue(0),
                                ]),

                            Textarea::make('observaciones')
                                ->label('Observaciones')
                                ->rows(2)
                                ->columnSpanFull(),
                        ])
                        ->action(function (Collection $records, array $data): void {
                            $count = 0;
                            
                            foreach ($records as $animalito) {
                                Vacuna::create([
                                    'animalito_id' => $animalito->id,
                                    'nombre' => $data['nombre'],
                                    'lote' => $data['lote'] ?? null,
                                    'fecha_aplicacion' => $data['fecha_aplicacion'],
                                    'fecha_proxima' => $data['fecha_proxima'] ?? null,
                                    'veterinario_id' => $data['veterinario_id'] ?? null,
                                    'costo' => $data['costo'] ?? 0,
                                    'observaciones' => $data['observaciones'] ?? null,
                                ]);
                                $count++;
                            }

                            Notification::make()
                                ->title('Vacunas asignadas correctamente')
                                ->body("Se asignó la vacuna '{$data['nombre']}' a {$count} animalito(s).")
                                ->success()
                                ->send();
                        })
                        ->deselectRecordsAfterCompletion(),

                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}

