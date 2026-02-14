<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Adoptante;
use App\Observers\AdoptanteObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Adoptante::observe(AdoptanteObserver::class);
    }
}
