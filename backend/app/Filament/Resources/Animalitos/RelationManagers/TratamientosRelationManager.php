<?php

namespace App\Filament\Resources\Animalitos\RelationManagers;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class TratamientosRelationManager extends RelationManager
{
    protected static string $relationship = 'tratamientos';

    protected static ?string $title = 'Tratamientos';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)
                    ->schema([
                        TextInput::make('nombre')
                            ->label('Nombre del tratamiento')
                            ->required()
                            ->maxLength(255)
                            ->columnSpan(1),

                        Select::make('veterinario_id')
                            ->label('Veterinario')
                            ->relationship('veterinario', 'nombre')
                            ->searchable()
                            ->preload()
                            ->createOptionForm([
                                TextInput::make('nombre')
                                    ->label('Nombre del veterinario')
                                    ->required()
                                    ->maxLength(255),
                            ])
                            ->columnSpan(1),
                    ]),

                Textarea::make('descripcion')
                    ->label('Descripción')
                    ->rows(3)
                    ->columnSpanFull(),

                Grid::make(3)
                    ->schema([
                        DatePicker::make('fecha_inicio')
                            ->label('Fecha de inicio')
                            ->required()
                            ->native(false)
                            ->displayFormat('d/m/Y'),

                        DatePicker::make('fecha_fin')
                            ->label('Fecha de fin')
                            ->native(false)
                            ->displayFormat('d/m/Y'),

                        Select::make('estado')
                            ->label('Estado')
                            ->options([
                                'En curso' => 'En curso',
                                'Completado' => 'Completado',
                                'Cancelado' => 'Cancelado',
                            ])
                            ->default('En curso')
                            ->required(),
                    ]),

                Grid::make(2)
                    ->schema([
                        TextInput::make('costo')
                            ->label('Costo')
                            ->numeric()
                            ->prefix('$')
                            ->default(0)
                            ->minValue(0),

                        Textarea::make('observaciones')
                            ->label('Observaciones')
                            ->rows(2),
                    ]),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('nombre')
            ->columns([
                TextColumn::make('nombre')
                    ->label('Tratamiento')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('fecha_inicio')
                    ->label('Inicio')
                    ->date('d/m/Y')
                    ->sortable(),

                TextColumn::make('fecha_fin')
                    ->label('Fin')
                    ->date('d/m/Y')
                    ->placeholder('En curso'),

                TextColumn::make('veterinario.nombre')
                    ->label('Veterinario')
                    ->searchable()
                    ->toggleable()
                    ->placeholder('Sin asignar'),

                TextColumn::make('costo')
                    ->label('Costo')
                    ->money('ARS')
                    ->sortable(),

                TextColumn::make('estado')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'En curso' => 'warning',
                        'Completado' => 'success',
                        'Cancelado' => 'danger',
                        default => 'gray',
                    }),
            ])
            ->filters([
                SelectFilter::make('estado')
                    ->options([
                        'En curso' => 'En curso',
                        'Completado' => 'Completado',
                        'Cancelado' => 'Cancelado',
                    ]),
            ])
            ->headerActions([
                CreateAction::make()
                    ->label('Nuevo tratamiento'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('fecha_inicio', 'desc');
    }
}
