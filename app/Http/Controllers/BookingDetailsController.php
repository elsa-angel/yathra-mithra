<?php

namespace App\Http\Controllers;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Booking;
use App\Models\Schedule;

class BookingDetailsController extends Controller
{
    public function show($id)
    {
        try {
            // Retrieve the booking along with the related schedule and bus
            $booking = Booking::with(['schedule.bus'])->findOrFail($id);

            return response()->json($booking);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Schedule not found'], 404);
        }
    }
}
