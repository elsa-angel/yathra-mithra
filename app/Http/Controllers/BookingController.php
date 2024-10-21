<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'schedule_id' => 'required|numeric|exists:schedule,id',
            'user_id' => 'required|numeric|exists:users,id',
            'fare' => 'required|numeric',
            'reserved_seats' => 'required|string',
            'departure_stop' => 'required|string',
            'arrival_stop' => 'required|string',
            'departure_time' => 'required|date_format:H:i',
            'arrival_time' => 'required|date_format:H:i',
            'booking_date' => 'required|string',
        ]);

        // Create a new booking record
        $booking = Booking::create([
            'schedule_id' => $request->schedule_id,
            'user_id' => $request->user_id,
            'amount' => $request->fare,
            'reserved_seats' => $request->reserved_seats,
            'departure_stop' => $request->departure_stop,
            'arrival_stop' => $request->arrival_stop,
            'departure_time' => $request->departure_time,
            'arrival_time' => $request->arrival_time,
            'booking_date' => $request->booking_date,
        ]);

        // Optionally, you can return a response, like a redirect or a JSON response
        return response()->json([
            'message' => 'Booking created successfully',
            'booking_id' => $booking->id // Return the ID of the new booking
        ], 201);
    }

    public function update(Request $request, $id)
    {
        // Validate incoming request data
        $request->validate([
            'schedule_id' => 'nullable|numeric|exists:schedules,id', // Use nullable if it can be optional
            'user_id' => 'nullable|numeric|exists:users,id',
            'reserved_seats' => 'nullable|string',
            'amount' => 'nullable|numeric',
            'departure_stop' => 'nullable|string|max:255',
            'arrival_stop' => 'nullable|string|max:255',
            'departure_time' => 'nullable|date_format:H:i',
            'arrival_time' => 'nullable|date_format:H:i',

        ]);

        // Find the booking
        $booking = Booking::findOrFail($id);

        // Update the booking with the validated data
        $booking->update($request->only([
            'schedule_id',
            'user_id',
            'reserved_seats',
            'amount',
            'departure_stop',
            'arrival_stop',
            'departure_time',
            'arrival_time',

        ]));

        // Return a response
        return response()->json([
            'message' => 'Booking updated successfully',
            'booking' => $booking // Return the updated booking data
        ], 200);
    }
}
