<?php

namespace App\Filament\Resources\Gastos\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class GastoInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('concepto'),
                TextEntry::make('monto')
                    ->numeric(),
                TextEntry::make('fecha')
                    ->date(),
                TextEntry::make('categoria'),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
