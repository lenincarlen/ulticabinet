<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;

    protected $table = 'staff';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'email',
        'calendar_id',
        'personal_phone',
        'fleet_phone',
        'id_number',
        'access_key',
        'code',
        'address',
        'salary',
        'start_date',
        'tss',
        'afp',
        'loans',
        'work_error_deduction',
        'other_deductions',
        'discount',
        'required_hours',
        'worked_hours',
        'overtime_value',
        'total_hours_value',
        'income',
        'commission',
        'is_payroll_taxable',
        'commission_base',
        'tss_deduction_schedule',
        'afp_deduction_schedule',
        'id_photo_url',
        'employee_photo_url',
        'active_orders_count',
        'total_assigned_orders',
        'last_assignment_at',
    ];

    protected $casts = [
        'salary' => 'decimal:2',
        'tss' => 'decimal:2',
        'afp' => 'decimal:2',
        'loans' => 'decimal:2',
        'work_error_deduction' => 'decimal:2',
        'other_deductions' => 'decimal:2',
        'discount' => 'float',
        'required_hours' => 'float',
        'worked_hours' => 'float',
        'overtime_value' => 'decimal:2',
        'total_hours_value' => 'decimal:2',
        'income' => 'decimal:2',
        'commission' => 'decimal:2',
    ];

   

    public function createdCustomers()
    {
        return $this->hasMany(Customer::class, 'created_by_id');
    }

   

   

    
  

    public function technicianEquipments()
    {
        return $this->hasMany(WorkshopEquipment::class, 'technician_id');
    }

    public function paymentCommissions()
    {
        return $this->hasMany(PaymentDetails::class, 'commission_technician_id');
    }

    public function lineItemCommissions()
    {
        return $this->hasMany(InvoiceLineItem::class, 'commission_technician_id');
    }

    public function commissions()
    {
        return $this->hasMany(Commission::class, 'staff_id');
    }

    public function pendingCommissions()
    {
        return $this->hasMany(Commission::class, 'staff_id')->where('status', 'pending');
    }

    public function paidCommissions()
    {
        return $this->hasMany(Commission::class, 'staff_id')->where('status', 'paid');
    }

    /**
     * Get the user account associated with this staff member.
     */
    public function user()
    {
        return $this->hasOne(User::class, 'staff_id');
    }

    /**
     * Get the primary role of this staff member from their user account.
     * This is a convenience accessor that gets the first role from user.roles
     */
    public function getRoleAttribute()
    {
        if ($this->user && $this->user->roles && $this->user->roles->count() > 0) {
            return $this->user->roles->first()->name;
        }
        return null;
    }

    /**
     * Get all roles of this staff member from their user account.
     */
    public function getRolesAttribute()
    {
        if ($this->user && $this->user->roles) {
            return $this->user->roles;
        }
        return collect([]);
    }

    /**
     * Scope to filter staff by role through their user account.
     */
    public function scopeWithRole($query, string $roleName)
    {
        return $query->whereHas('user.roles', function ($q) use ($roleName) {
            $q->where('name', $roleName);
        });
    }

    /**
     * Scope to filter only operators.
     */
    public function scopeOperators($query)
    {
        return $query->whereHas('user.roles', function ($q) {
            $q->whereIn('name', ['operator', 'operador']);
        });
    }

    /**
     * Scope to filter operators available for assignment.
     */
    public function scopeAvailableForAssignment($query)
    {
        return $query->operators()
            ->whereHas('user', function ($q) {
                $q->where('is_active', true);
            });
    }

    /**
     * Increment workload counters when order is assigned.
     */
    public function incrementWorkload()
    {
        $this->increment('active_orders_count');
        $this->increment('total_assigned_orders');
        $this->update(['last_assignment_at' => now()]);
    }

    /**
     * Decrement workload counter when order is completed/cancelled.
     */
    public function decrementWorkload()
    {
        if ($this->active_orders_count > 0) {
            $this->decrement('active_orders_count');
        }
    }
}