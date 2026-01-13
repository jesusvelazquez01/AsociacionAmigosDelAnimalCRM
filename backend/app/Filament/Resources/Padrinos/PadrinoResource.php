<?php

namespace App\Filament\Resources\Padrinos;

use App\Filament\Resources\Padrinos\Pages\CreatePadrino;
use App\Filament\Resources\Padrinos\Pages\EditPadrino;
use App\Filament\Resources\Padrinos\Pages\ListPadrinos;
use App\Filament\Resources\Padrinos\Pages\ViewPadrino;
use App\Filament\Resources\Padrinos\Schemas\PadrinoForm;
use App\Filament\Resources\Padrinos\Schemas\PadrinoInfolist;
use App\Filament\Resources\Padrinos\Tables\PadrinosTable;
use App\Models\Padrino;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PadrinoResource extends Resource
{
    protected static ?string $model = Padrino::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUsers;

    protected static ?string $navigationLabel = 'Padrinos';

    protected static ?string $modelLabel = 'Padrino';

    protected static ?string $pluralModelLabel = 'Padrinos';

    protected static string|\UnitEnum|null $navigationGroup = 'Refugio';

    protected static ?int $navigationSort = 2;

    protected static ?string $recordTitleAttribute = 'nombre';

    public static function form(Schema $schema): Schema
    {
        return PadrinoForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PadrinoInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PadrinosTable::configure($table);
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
            'index' => ListPadrinos::route('/'),
            'create' => CreatePadrino::route('/create'),
            'view' => ViewPadrino::route('/{record}'),
            'edit' => EditPadrino::route('/{record}/edit'),
        ];
    }
}
