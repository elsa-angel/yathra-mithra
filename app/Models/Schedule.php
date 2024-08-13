<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    // Define the table name if different from the default
    protected $table = 'schedule';

    // Define the fillable attributes
    protected $fillable = [
        'bus_id',
        'fare',
        'stops',
        'stops_timings',
        'running_days'
    ];

    // Define the relationship with the Bus model
    public function bus()
    {
        return $this->belongsTo(Bus::class, 'bus_id');
    }
}
