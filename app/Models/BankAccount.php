<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;

    protected $table = 'bank_accounts';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'bank_name',
        'account_holder',
        'account_number',
    ];

    public function payments()
    {
        return $this->hasMany(PaymentDetails::class, 'bank_account_id');
    }
}