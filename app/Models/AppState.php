<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppState extends Model
{
    use HasFactory;

    protected $table = 'app_state';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'last_invoice_number',
        'last_quote_number',
        'last_pos_order_number',
    ];

    protected $casts = [
        'last_invoice_number' => 'integer',
        'last_quote_number' => 'integer',
        'last_pos_order_number' => 'integer',
    ];
}