<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use BezhanSalleh\GoogleAnalytics\Widgets;

class AnalyticsDashboard extends Page
{
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-chart-bar';

    protected static ?string $navigationLabel = 'Analytics';

    protected static string|\UnitEnum|null $navigationGroup = 'Reportes';

    protected static ?int $navigationSort = 1;

    protected string $view = 'filament.pages.analytics-dashboard';

    public function getTitle(): string|\Illuminate\Contracts\Support\Htmlable
    {
        return 'Google Analytics';
    }

    protected function getHeaderWidgets(): array
    {
        return [
            Widgets\ActiveUsersOneDayWidget::class,
            Widgets\ActiveUsersSevenDayWidget::class,
            Widgets\ActiveUsersTwentyEightDayWidget::class,
            Widgets\PageViewsWidget::class,
            Widgets\VisitorsWidget::class,
            Widgets\SessionsWidget::class,
            Widgets\SessionsByDeviceWidget::class,
            Widgets\SessionsByCountryWidget::class,
            Widgets\MostVisitedPagesWidget::class,
            Widgets\TopReferrersListWidget::class,
        ];
    }
}
