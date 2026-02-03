<?php

if (!function_exists('site_setting')) {
    /**
     * Get a site setting value by key
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    function site_setting(string $key, $default = null)
    {
        return \App\Models\SiteSetting::get($key, $default);
    }
}

if (!function_exists('company_name')) {
    /**
     * Get the company name from site settings
     *
     * @return string
     */
    function company_name(): string
    {
        return site_setting('company_name', config('app.name', 'Laravel'));
    }
}

if (!function_exists('company_phone')) {
    /**
     * Get the company phone from site settings
     *
     * @return string|null
     */
    function company_phone(): ?string
    {
        return site_setting('company_phone');
    }
}

if (!function_exists('company_email')) {
    /**
     * Get the company email from site settings
     *
     * @return string|null
     */
    function company_email(): ?string
    {
        return site_setting('company_email');
    }
}

if (!function_exists('company_address')) {
    /**
     * Get the company address from site settings
     *
     * @return string|null
     */
    function company_address(): ?string
    {
        return site_setting('company_address');
    }
}
