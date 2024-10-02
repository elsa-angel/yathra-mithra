<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'schedule_id' => 'required|string',
            'user_id' => 'required|string',
            'fare' => 'required|string',
            'departure_stop' => 'required|string',
            'arrival_stop' => 'required|string',
            'departure_time' => 'required|date_format:H:i',
            'arrival_time' => 'required|date_format:H:i',
        ]);

        // Create a new booking record
        $booking = Booking::create([
            'schedule_id' => $request->schedule_id,
            'user_id' => $request->user_id,
            'departure_stop' => $request->departure_stop,
            'arrival_stop' => $request->arrival_stop,
            'departure_time' => $request->departure_time,
            'arrival_time' => $request->arrival_time,
        ]);

        // Optionally, you can return a response, like a redirect or a JSON response
        return response()->json([
            'message' => 'Booking created successfully',
            'booking_id' => $booking->id // Return the ID of the new booking
        ], 201);
    }
}
