<?php

namespace App\Filament\Resources\Adoptantes;

use App\Filament\Resources\Adoptantes\Pages\CreateAdoptante;
use App\Filament\Resources\Adoptantes\Pages\EditAdoptante;
use App\Filament\Resources\Adoptantes\Pages\ListAdoptantes;
use App\Filament\Resources\Adoptantes\Pages\ViewAdoptante;
use App\Filament\Resources\Adoptantes\Schemas\AdoptanteForm;

use App\Filament\Resources\Adoptantes\Tables\AdoptantesTable;

use App\Models\Adoptante;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AdoptanteResource extends Resource
{
    protected static ?string $model = Adoptante::class;

    protected static ?string $recordTitleAttribute = 'nombre_completo';
    protected static string|\UnitEnum|null $navigationGroup = 'Refugio';
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUsers;

    public static function form(Schema $schema): Schema
    {
        return AdoptanteForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AdoptantesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListAdoptantes::route('/'),
            'create' => CreateAdoptante::route('/create'),
            'edit' => EditAdoptante::route('/{record}/edit'),
            'view' => ViewAdoptante::route('/{record}'),
        ];
    }
}
