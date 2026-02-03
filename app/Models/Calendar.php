<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color',
        'is_active',
    ];

    public function staff()
    {
        return $this->hasMany(Staff::class);
    }
}
