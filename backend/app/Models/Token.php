<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    use HasFactory;

    protected $fillable = [
        'token',
        'name',
        'user_id',
        'abilities',
    ];

    protected $casts = [
        'abilities' => 'array',
    ];

    public function tokenable()
    {
        return $this->morphTo();
    }
}
