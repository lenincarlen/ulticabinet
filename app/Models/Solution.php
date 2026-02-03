<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Solution extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'short_description',
        'icon',
        'image_path',
        'category',
        'features',
        'benefits',
        'target_audience',
        'pricing_model',
        'demo_duration_minutes',
        'is_active',
        'display_order',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'features' => 'array',
        'benefits' => 'array',
        'target_audience' => 'array',
        'demo_duration_minutes' => 'integer',
        'is_active' => 'boolean',
        'display_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get all demo requests for this solution
     */
    public function demoRequests()
    {
        return $this->hasMany(DemoRequest::class, 'solution_id');
    }

    /**
     * Get active demo requests for this solution
     */
    public function activeDemoRequests()
    {
        return $this->hasMany(DemoRequest::class, 'solution_id')
            ->whereIn('status', ['pending', 'confirmed', 'in_progress']);
    }

    /**
     * Scope to get only active solutions
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order by display order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order', 'asc');
    }

    /**
     * Get the route key for the model
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
