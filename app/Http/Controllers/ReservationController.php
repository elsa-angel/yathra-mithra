<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'schedule_id' => 'required|numeric|exists:schedule,id',
            'user_id' => 'required|numeric|exists:users,id',
            'payment_id' => 'required|string',
            'amount' => 'required|numeric',
            'status' => 'required|string',
            'reserved_seats' => 'required|string',
            'departure_stop' => 'required|string',
            'arrival_stop' => 'required|string',
            'departure_time' => 'required|date_format:H:i',
            'arrival_time' => 'required|date_format:H:i',
        ]);

        // Create a new booking record
        $reservation = Reservation::create([
            'schedule_id' => $request->schedule_id,
            'user_id' => $request->user_id,
            'payment_id' => $request->payment_id,
            'amount' => $request->amount,
            'status' => $request->status,
            'qr_code' => $request->qr_code,
            'reserved_seats' => $request->reserved_seats,
            'departure_stop' => $request->departure_stop,
            'arrival_stop' => $request->arrival_stop,
            'departure_time' => $request->departure_time,
            'arrival_time' => $request->arrival_time,
        ]);

        // Optionally, you can return a response, like a redirect or a JSON response
        return response()->json([
            'message' => 'Reservation created successfully',
            'reservation_id' => $reservation->id // Return the ID of the new booking
        ], 201);
    }

    public function show()
    {
        try {
            $reservations = Reservation::where('user_id', 1)
                ->with('schedule.bus')
                ->get();
            return response()->json($reservations);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Reservation not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred'], 500);
        }
    }
}
