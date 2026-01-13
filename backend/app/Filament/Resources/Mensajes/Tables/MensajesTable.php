<?php

namespace App\Filament\Resources\Mensajes\Tables;

use App\Models\Mensaje;
use Filament\Actions\Action;
use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;

class MensajesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                IconColumn::make('leido')
                    ->label('')
                    ->boolean()
                    ->trueIcon('heroicon-o-envelope-open')
                    ->falseIcon('heroicon-o-envelope')
                    ->trueColor('gray')
                    ->falseColor('danger')
                    ->sortable(),

                TextColumn::make('nombre_completo')
                    ->label('Remitente')
                    ->getStateUsing(fn ($record) => "{$record->nombre} {$record->apellido}")
                    ->searchable(['nombre', 'apellido'])
                    ->weight('bold'),

                TextColumn::make('telefono')
                    ->label('Teléfono')
                    ->icon('heroicon-o-phone')
                    ->searchable()
                    ->placeholder('Sin teléfono'),

                TextColumn::make('email')
                    ->label('Email')
                    ->copyable()
                    ->icon('heroicon-o-envelope')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('asunto')
                    ->label('Asunto')
                    ->searchable()
                    ->limit(35)
                    ->wrap(),

                IconColumn::make('respondido_at')
                    ->label('Respondido')
                    ->boolean()
                    ->getStateUsing(fn ($record) => $record->respondido_at !== null)
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-clock')
                    ->trueColor('success')
                    ->falseColor('warning'),

                TextColumn::make('created_at')
                    ->label('Recibido')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->since(),
            ])
            ->filters([
                TernaryFilter::make('leido')
                    ->label('Estado de lectura')
                    ->placeholder('Todos')
                    ->trueLabel('Leídos')
                    ->falseLabel('No leídos'),

                TernaryFilter::make('respondido')
                    ->label('Estado de respuesta')
                    ->placeholder('Todos')
                    ->trueLabel('Respondidos')
                    ->falseLabel('Sin responder')
                    ->queries(
                        true: fn ($query) => $query->whereNotNull('respondido_at'),
                        false: fn ($query) => $query->whereNull('respondido_at'),
                    ),
            ])
            ->recordActions([
                ViewAction::make(),

                // Botón de WhatsApp
                Action::make('whatsapp')
                    ->label('WhatsApp')
                    ->icon('heroicon-o-chat-bubble-left-ellipsis')
                    ->color('success')
                    ->visible(fn (Mensaje $record) => !empty($record->telefono))
                    ->url(function (Mensaje $record) {
                        // Limpiar el número de teléfono (solo números)
                        $numero = preg_replace('/[^0-9]/', '', $record->telefono);

                        // Asegurarse de que tenga código de país Argentina
                        if (!str_starts_with($numero, '54')) {
                            $numero = '54' . $numero;
                        }

                        // Crear mensaje con el asunto
                        $nombre = $record->nombre;
                        $asunto = $record->asunto;
                        $mensaje = "Hola {$nombre}, te escribimos desde *Amigos del Animal* 🐾. Recibimos tu consulta sobre *{$asunto}*. ¿En qué podemos ayudarte?";

                        $texto = urlencode($mensaje);

                        return "https://wa.me/{$numero}?text={$texto}";
                    })
                    ->openUrlInNewTab(),

                Action::make('marcarLeido')
                    ->label('Leído')
                    ->icon('heroicon-o-envelope-open')
                    ->color('gray')
                    ->visible(fn ($record) => !$record->leido)
                    ->action(function ($record) {
                        $record->update(['leido' => true]);
                        Notification::make()
                            ->title('Mensaje marcado como leído')
                            ->success()
                            ->send();
                    }),

                Action::make('marcarRespondido')
                    ->label('Respondido')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn ($record) => $record->respondido_at === null)
                    ->action(function ($record) {
                        $record->update([
                            'leido' => true,
                            'respondido_at' => now(),
                        ]);
                        Notification::make()
                            ->title('Mensaje marcado como respondido')
                            ->success()
                            ->send();
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    BulkAction::make('marcarLeidosBulk')
                        ->label('Marcar como leídos')
                        ->icon('heroicon-o-envelope-open')
                        ->action(function (Collection $records) {
                            $records->each->update(['leido' => true]);
                            Notification::make()
                                ->title('Mensajes marcados como leídos')
                                ->success()
                                ->send();
                        })
                        ->deselectRecordsAfterCompletion(),
                    BulkAction::make('marcarRespondidosBulk')
                        ->label('Marcar como respondidos')
                        ->icon('heroicon-o-check-circle')
                        ->action(function (Collection $records) {
                            $records->each->update([
                                'leido' => true,
                                'respondido_at' => now(),
                            ]);
                            Notification::make()
                                ->title('Mensajes marcados como respondidos')
                                ->success()
                                ->send();
                        })
                        ->deselectRecordsAfterCompletion(),
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}


