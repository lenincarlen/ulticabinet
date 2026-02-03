<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentDetails extends Model
{
    use HasFactory;

    protected $table = 'payment_details';
    protected $primaryKey = 'id';
    public $incrementing = true; // Cambiar a true porque la tabla usa integer autoincrement
    protected $keyType = 'int';

    protected $fillable = [
        'id',
        'method',
        'payment_method', // Mantener compatibilidad con la columna existente
        'amount',
        'payment_date',
        'bank_account_id',
        'cash_received',
        'change_given',
        'invoice_id',
        'commission_technician_id',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_date' => 'datetime',
        'cash_received' => 'decimal:2',
        'change_given' => 'decimal:2',
    ];

    public function bankAccount()
    {
        return $this->belongsTo(BankAccount::class, 'bank_account_id');
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'invoice_id');
    }

    public function commissionTechnician()
    {
        return $this->belongsTo(Staff::class, 'commission_technician_id');
    }
}