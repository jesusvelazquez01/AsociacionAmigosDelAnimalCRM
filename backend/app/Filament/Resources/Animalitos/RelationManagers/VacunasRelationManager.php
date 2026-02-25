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
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class VacunasRelationManager extends RelationManager
{
    protected static string $relationship = 'vacunas';

    protected static ?string $title = 'Vacunas';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(1)
                    ->schema([
                        TextInput::make('nombre')
                            ->label('Nombre de la vacuna')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('lote')
                            ->label('Número de lote')
                            ->maxLength(255),
                    ]),

                Grid::make(1)
                    ->schema([
                        DatePicker::make('fecha_aplicacion')
                            ->label('Fecha de aplicación')
                            ->required()
                            ->native(false)
                            ->displayFormat('d/m/Y'),

                        DatePicker::make('fecha_proxima')
                            ->label('Próxima aplicación')
                            ->native(false)
                            ->displayFormat('d/m/Y'),
                    ]),

                Grid::make(1)
                    ->schema([
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
                            ->editOptionForm([
                                TextInput::make('nombre')
                                    ->label('Nombre del veterinario')
                                    ->required()
                                    ->maxLength(255),
                            ]),

                        TextInput::make('costo')
                            ->label('Costo')
                            ->numeric()
                            ->prefix('$')
                            ->default(0)
                            ->minValue(0),
                    ]),

                Textarea::make('observaciones')
                    ->label('Observaciones')
                    ->rows(2)
                    ->columnSpanFull(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('nombre')
            ->columns([
                TextColumn::make('nombre')
                    ->label('Vacuna')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('lote')
                    ->label('Lote')
                    ->searchable()
                    ->toggleable(),

                TextColumn::make('fecha_aplicacion')
                    ->label('Aplicación')
                    ->date('d/m/Y')
                    ->sortable(),

                TextColumn::make('fecha_proxima')
                    ->label('Próxima')
                    ->date('d/m/Y')
                    ->placeholder('No programada')
                    ->color(
                        fn($record) =>
                        $record->fecha_proxima && $record->fecha_proxima->isBefore(now()->addDays(30))
                            ? 'warning'
                            : null
                    ),

                TextColumn::make('veterinario.nombre')
                    ->label('Veterinario')
                    ->searchable()
                    ->toggleable()
                    ->placeholder('Sin asignar'),

                TextColumn::make('costo')
                    ->label('Costo')
                    ->money('ARS')
                    ->sortable()
                    ->toggleable(),

                IconColumn::make('necesita_refuerzo')
                    ->label('Alerta')
                    ->boolean()
                    ->trueIcon('heroicon-o-exclamation-triangle')
                    ->falseIcon('heroicon-o-check-circle')
                    ->trueColor('warning')
                    ->falseColor('success')
                    ->getStateUsing(
                        fn($record) =>
                        $record->fecha_proxima && $record->fecha_proxima->isBefore(now()->addDays(30))
                    ),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                CreateAction::make()
                    ->label('Nueva vacuna'),
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
            ->defaultSort('fecha_aplicacion', 'desc');
    }
}
