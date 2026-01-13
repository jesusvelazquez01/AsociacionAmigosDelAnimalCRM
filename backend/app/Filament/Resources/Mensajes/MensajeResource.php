<?php

namespace App\Filament\Resources\Mensajes;

use App\Filament\Resources\Mensajes\Pages\ListMensajes;
use App\Filament\Resources\Mensajes\Pages\ViewMensaje;
use App\Filament\Resources\Mensajes\Schemas\MensajeForm;
use App\Filament\Resources\Mensajes\Schemas\MensajeInfolist;
use App\Filament\Resources\Mensajes\Tables\MensajesTable;
use App\Models\Mensaje;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class MensajeResource extends Resource
{
    protected static ?string $model = Mensaje::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedEnvelope;

    protected static ?string $navigationLabel = 'Mensajes';

    protected static ?string $modelLabel = 'Mensaje';

    protected static ?string $pluralModelLabel = 'Mensajes';

    protected static string|\UnitEnum|null $navigationGroup = 'Comunicación';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'asunto';

    /**
     * Badge con cantidad de mensajes sin responder
     * Cuando se marca como respondido, el contador baja
     */
    public static function getNavigationBadge(): ?string
    {
        $count = Mensaje::sinResponder()->count();
        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        $count = Mensaje::sinResponder()->count();
        
        if ($count === 0) {
            return 'success';
        } elseif ($count <= 3) {
            return 'warning';
        }
        
        return 'danger';
    }

    public static function form(Schema $schema): Schema
    {
        return MensajeForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return MensajeInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MensajesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListMensajes::route('/'),
            'view' => ViewMensaje::route('/{record}'),
        ];
    }

    /**
     * Los mensajes no se pueden crear desde el panel
     */
    public static function canCreate(): bool
    {
        return false;
    }

    /**
     * Los mensajes no se pueden editar
     */
    public static function canEdit($record): bool
    {
        return false;
    }
}


