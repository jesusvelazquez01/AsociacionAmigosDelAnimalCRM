<?php

namespace App\Observers;

use App\Models\Adoptante;

class AdoptanteObserver
{
    /**
     * Handle the Adoptante "created" event.
     */
    public function created(Adoptante $adoptante): void
    {
        //
    }

    /**
     * Handle the Adoptante "updated" event.
     */
    public function updated(Adoptante $adoptante): void
    {
        // Si el estado cambió a "aprobado"
        if ($adoptante->wasChanged('estado') && $adoptante->estado === 'aprobado') {
            // Marcar animalitos como adoptados
            $adoptante->animalitos()->update(['adoptado' => true],['activo' => false],['estado' => false]);
        }
    }

    /**
     * Handle the Adoptante "deleted" event.
     */
    public function deleted(Adoptante $adoptante): void
    {
        //
    }

    /**
     * Handle the Adoptante "restored" event.
     */
    public function restored(Adoptante $adoptante): void
    {
        //
    }

    /**
     * Handle the Adoptante "force deleted" event.
     */
    public function forceDeleted(Adoptante $adoptante): void
    {
        //
    }
}
