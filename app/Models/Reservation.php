<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = 'reservation';
    protected $fillable = [
        'schedule_id',
        'user_id',
        'payment_id',
        'amount',
        'status',
        'qr_code',
        'departure_stop',
        'arrival_stop',
        'departure_time',
        'arrival_time',
        'reserved_seats'
    ];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
