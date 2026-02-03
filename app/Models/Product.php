<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'code',
        'name',
        'type',
        'purchase_price',
        'sell_price1',
        'sell_price2',
        'sell_price3',
        'stock',
    ];

    protected $casts = [
        'purchase_price' => 'decimal:2',
        'sell_price1' => 'decimal:2',
        'sell_price2' => 'decimal:2',
        'sell_price3' => 'decimal:2',
        'stock' => 'integer',
    ];

    public function invoiceLineItems()
    {
        return $this->hasMany(InvoiceLineItem::class, 'product_id');
    }
}