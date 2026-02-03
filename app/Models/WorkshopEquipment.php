<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkshopEquipment extends Model
{
    use HasFactory;

    protected $table = 'workshop_equipment';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'entry_date',
        'customer_id',
        'equipment_type',
        'brand',
        'model',
        'serial_number',
        'reported_fault',
        'technician_id',
        'status',
        'history',
    ];

    protected $casts = [
        'entry_date' => 'datetime',
        'history' => 'array',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function technician()
    {
        return $this->belongsTo(Staff::class, 'technician_id');
    }
}