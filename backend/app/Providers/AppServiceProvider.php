<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Adoptante;
use App\Observers\AdoptanteObserver;
use BezhanSalleh\LanguageSwitch\LanguageSwitch;

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

        LanguageSwitch::configureUsing(function (LanguageSwitch $switch) {
            $switch
                ->displayLocale('es')
                ->circular()
                ->locales(['es', 'en']); // also accepts a closure
        });
    }
}
