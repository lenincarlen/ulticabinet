<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DemoRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'solution_id',
        'request_number',
        'company_name',
        'contact_name',
        'contact_email',
        'contact_phone',
        'company_size',
        'industry',
        'current_solution',
        'pain_points',
        'preferred_date',
        'preferred_time',
        'timezone',
        'demo_format',
        'additional_notes',
        'status',
        'assigned_to',
        'scheduled_at',
        'completed_at',
        'cancelled_at',
        'cancellation_reason',
        'demo_notes',
        'follow_up_date',
        'conversion_probability',
        'estimated_value',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'referrer_url',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'pain_points' => 'array',
        'preferred_date' => 'date',
        'scheduled_at' => 'datetime',
        'completed_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'follow_up_date' => 'date',
        'conversion_probability' => 'integer',
        'estimated_value' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the solution for this demo request
     */
    public function solution()
    {
        return $this->belongsTo(Solution::class, 'solution_id');
    }

    /**
     * Get the staff member assigned to this demo
     */
    // public function assignedStaff()
    // {
    //     return $this->belongsTo(Staff::class, 'assigned_to');
    // }

    /**
     * Get the status history for this demo request
     */
    public function statusHistory()
    {
        return $this->hasMany(DemoRequestStatusHistory::class, 'demo_request_id')
            ->orderBy('created_at', 'desc');
    }

    /**
     * Add a status change to history
     */
    public function addStatusHistory($newStatus, $notes = null, $changedBy = null)
    {
        $oldStatus = $this->status;
        
        DemoRequestStatusHistory::create([
            'demo_request_id' => $this->id,
            'old_status' => $oldStatus,
            'new_status' => $newStatus,
            'changed_by_id' => $changedBy,
            'notes' => $notes,
        ]);

        $this->update(['status' => $newStatus]);
    }

    /**
     * Scope to filter by status
     */
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to get pending requests
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope to get confirmed requests
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    /**
     * Scope to get completed requests
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope to filter by solution
     */
    public function scopeForSolution($query, $solutionId)
    {
        return $query->where('solution_id', $solutionId);
    }

    /**
     * Scope to filter by assigned staff
     */
    // public function scopeAssignedTo($query, $staffId)
    // {
    //     return $query->where('assigned_to', $staffId);
    // }

    /**
     * Generate a unique request number
     */
    public static function generateRequestNumber()
    {
        $prefix = 'DEMO-';
        $year = date('Y');
        $month = date('m');
        
        $lastRequest = self::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->orderBy('id', 'desc')
            ->first();
        
        $sequence = $lastRequest ? (int)substr($lastRequest->request_number, -4) + 1 : 1;
        
        return $prefix . $year . $month . '-' . str_pad($sequence, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Check if demo is overdue
     */
    public function isOverdue()
    {
        if (!$this->scheduled_at) {
            return false;
        }

        return $this->scheduled_at->isPast() && 
               in_array($this->status, ['pending', 'confirmed']);
    }

    /**
     * Get status badge color
     */
    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'pending', 'new' => 'yellow',
            'quoted' => 'purple',
            'for_preview' => 'indigo',
            'previewed' => 'teal',
            'sold', 'completed' => 'green',
            'cancelled', 'no_show' => 'red',
            'confirmed' => 'blue', // Keep for backward compatibility
            'in_progress' => 'blue', // Keep for backward compatibility
            default => 'gray',
        };
    }
}
