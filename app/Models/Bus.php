<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;

    // The table associated with the model.
    protected $table = 'bus';

    // The attributes that are mass assignable.
    protected $fillable = [
        'bus_name',
        'num_seats',
    ];
}
