<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemoRequestStatusHistory extends Model
{
    use HasFactory, \Illuminate\Database\Eloquent\Concerns\HasUuids;

    protected $table = 'demo_request_status_history';
    public $timestamps = false;

    protected $fillable = [
        'demo_request_id',
        'old_status',
        'new_status',
        'changed_by_id',
        'notes',
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    /**
     * Get the demo request this history belongs to
     */
    public function demoRequest()
    {
        return $this->belongsTo(DemoRequest::class, 'demo_request_id');
    }

    /**
     * Get the user who made the change
     */
    public function changedByUser()
    {
        return $this->belongsTo(User::class, 'changed_by_id');
    }
}
