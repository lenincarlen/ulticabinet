<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SiteSettingController extends Controller
{
    /**
     * Display the settings page
     */
    public function index()
    {
        $settings = SiteSetting::all()->groupBy('group');
        
        return Inertia::render('admin/settings/site', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update settings
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
        ]);

        foreach ($validated['settings'] as $key => $value) {
            $setting = SiteSetting::where('key', $key)->first();
            
            if ($setting) {
                // Handle file uploads
                if ($setting->type === 'image' && $request->hasFile("settings.{$key}")) {
                    // Delete old image if exists
                    if ($setting->value) {
                        Storage::disk('public')->delete($setting->value);
                    }
                    
                    $path = $request->file("settings.{$key}")->store('settings', 'public');
                    $value = $path;
                }
                
                // Trim string values
                if (is_string($value)) {
                    $value = trim($value);
                }
                
                $setting->update(['value' => $value]);
            } else {
                // Create setting if it doesn't exist
                SiteSetting::create([
                    'key' => $key,
                    'value' => is_string($value) ? trim($value) : $value,
                    'type' => 'text',
                    'group' => 'general',
                ]);
            }
        }

        SiteSetting::clearCache();
        
        // Clear mail configuration cache
        \App\Services\MailConfigService::clearCache();

        return redirect()->back()->with('success', 'Configuración actualizada correctamente');
    }

    /**
     * Upload image for a setting
     */
    public function uploadImage(Request $request, string $key)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $setting = SiteSetting::where('key', $key)->firstOrFail();

        // Delete old image if exists
        if ($setting->value) {
            Storage::disk('public')->delete($setting->value);
        }

        $path = $request->file('image')->store('settings', 'public');
        
        $setting->update(['value' => $path]);
        SiteSetting::clearCache();

        return response()->json([
            'success' => true,
            'path' => $path, // Devolver el path relativo, no la URL completa
        ]);
    }

    /**
     * Get all settings as JSON (for API)
     */
    public function getSettings()
    {
        return response()->json(SiteSetting::getAll());
    }

    /**
     * Get settings by group
     */
    public function getByGroup(string $group)
    {
        return response()->json(SiteSetting::getByGroup($group));
    }
}
