<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;

    protected $table = 'quotes';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'quote_number',
        'customer_id',
        'date',
        'subtotal',
        'discount',
        'is_taxable',
        'taxes',
        'total',
        'status',
        'created_by_id',
    ];

    protected $casts = [
        'date' => 'datetime',
        'subtotal' => 'decimal:2',
        'discount' => 'float',
        'is_taxable' => 'boolean',
        'taxes' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function items()
    {
        return $this->hasMany(InvoiceLineItem::class, 'quote_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(Staff::class, 'created_by_id');
    }
}