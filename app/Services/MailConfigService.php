<?php

namespace App\Services;

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cache;

class MailConfigService
{
    /**
     * Configure mail settings from database
     * This is called on every request via AppServiceProvider
     */
    public static function configure(): void
    {
        // Use cached settings for performance
        $settings = Cache::remember('mail_settings', 3600, function () {
            return SiteSetting::where('group', 'email')->pluck('value', 'key');
        });
        
        if ($settings->isEmpty()) {
            return;
        }
        
        // Configure mail driver
        $driver = $settings->get('mail_driver') ?: env('MAIL_MAILER', 'log');
        Config::set('mail.default', $driver);
        
        // Only configure SMTP if driver is 'smtp' and we have the required values
        if ($driver === 'smtp') {
            $host = $settings->get('mail_host') ?: env('MAIL_HOST', '127.0.0.1');
            $port = $settings->get('mail_port') ? (int) $settings->get('mail_port') : (int) env('MAIL_PORT', 587);
            $encryption = $settings->get('mail_encryption') ?: env('MAIL_ENCRYPTION', 'tls');
            $username = $settings->get('mail_username') ?: env('MAIL_USERNAME');
            $password = $settings->get('mail_password') ?: env('MAIL_PASSWORD');
            
            // Only configure SMTP if host is provided
            if ($host) {
                Config::set('mail.mailers.smtp', [
                    'transport' => 'smtp',
                    'host' => $host,
                    'port' => $port,
                    'encryption' => $encryption,
                    'username' => $username,
                    'password' => $password,
                    'timeout' => null,
                    'local_domain' => env('MAIL_EHLO_DOMAIN', parse_url((string) env('APP_URL', 'http://localhost'), PHP_URL_HOST)),
                ]);
            }
        }
        
        // Configure from address
        $fromAddress = $settings->get('mail_from_address') ?: env('MAIL_FROM_ADDRESS', 'noreply@example.com');
        $fromName = $settings->get('mail_from_name') ?: env('MAIL_FROM_NAME', config('app.name'));
        
        if ($fromAddress) {
            Config::set('mail.from', [
                'address' => $fromAddress,
                'name' => $fromName,
            ]);
        }
    }
    
    /**
     * Clear mail configuration cache
     */
    public static function clearCache(): void
    {
        Cache::forget('mail_settings');
    }
    
    /**
     * Check if email notifications are enabled
     */
    public static function isEnabled(): bool
    {
        $setting = SiteSetting::where('key', 'notifications_enabled')->first();
        return $setting && $setting->value === 'true';
    }
    
    /**
     * Check if a specific notification type is enabled
     */
    public static function isNotificationEnabled(string $type): bool
    {
        if (!self::isEnabled()) {
            return false;
        }
        
        $setting = SiteSetting::where('key', $type)->first();
        return $setting && $setting->value === 'true';
    }
    
    /**
     * Get admin notification email
     */
    public static function getAdminEmail(): ?string
    {
        $setting = SiteSetting::where('key', 'admin_notification_email')->first();
        return $setting?->value ?: null;
    }
}
