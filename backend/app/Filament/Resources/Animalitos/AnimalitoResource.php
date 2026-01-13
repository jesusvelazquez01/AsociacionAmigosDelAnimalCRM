<?php

namespace App\Filament\Resources\Animalitos;

use App\Filament\Resources\Animalitos\Pages\CreateAnimalito;
use App\Filament\Resources\Animalitos\Pages\EditAnimalito;
use App\Filament\Resources\Animalitos\Pages\ListAnimalitos;
use App\Filament\Resources\Animalitos\Pages\ViewAnimalito;
use App\Filament\Resources\Animalitos\Schemas\AnimalitoForm;
use App\Filament\Resources\Animalitos\Schemas\AnimalitoInfolist;
use App\Filament\Resources\Animalitos\Tables\AnimalitosTable;
use App\Filament\Resources\Animalitos\RelationManagers\VacunasRelationManager;
use App\Filament\Resources\Animalitos\RelationManagers\TratamientosRelationManager;
use App\Models\Animalito;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AnimalitoResource extends Resource
{
    protected static ?string $model = Animalito::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedHeart;

    protected static ?string $navigationLabel = 'Rescataditos';

    protected static ?string $modelLabel = 'Rescatadito';

    protected static ?string $pluralModelLabel = 'Rescataditos';

    protected static string|\UnitEnum|null $navigationGroup = 'Refugio';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'nombre';

    public static function form(Schema $schema): Schema
    {
        return AnimalitoForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return AnimalitoInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AnimalitosTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
            VacunasRelationManager::class,
            TratamientosRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListAnimalitos::route('/'),
            'create' => CreateAnimalito::route('/create'),
            'view' => ViewAnimalito::route('/{record}'),
            'edit' => EditAnimalito::route('/{record}/edit'),
        ];
    }
}
