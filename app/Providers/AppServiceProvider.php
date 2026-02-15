<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

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
        // Configure mail settings from database
        try {
            // Skip if running in console and not a specific command that needs mail
            // This prevents "relation cache does not exist" error during build/deployment
            if (!app()->runningInConsole() || app()->runningUnitTests()) {
                \App\Services\MailConfigService::configure();
            }
        } catch (\Exception $e) {
            // Silently fail if database is not available (e.g., during migrations)
            // \Log::debug('Mail configuration skipped: ' . $e->getMessage());
        }
    }
}
