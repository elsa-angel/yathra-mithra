<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Schedule;
use App\Models\Bus;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'schedule_id' => 'required|numeric|exists:schedule,id',
            'user_id' => 'required|numeric|exists:users,id',
            'payment_id' => 'required|string|unique:reservation,payment_id',
            'amount' => 'required|numeric',
            'status' => 'required|string',
            'reserved_seats' => 'required|string',
            'departure_stop' => 'required|string',
            'arrival_stop' => 'required|string',
            'departure_time' => 'required|date_format:H:i',
            'arrival_time' => 'required|date_format:H:i',
            'booking_date' => 'required|string',
        ]);

        // Create a new reservation record
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
            'booking_date' => $request->booking_date,
        ]);

        // Update the bus table with reserved seats
        $schedule = Schedule::find($request->schedule_id);

        if ($schedule) {
            $bus = Bus::find($schedule->bus_id);

            if ($bus) {
                // Calculate the new reserved seats
                $bus->reserved_seats .= ',' . $request->reserved_seats; // Adjust this as needed for your format
                $bus->save();
            } else {
                return response()->json(['error' => 'Bus not found'], 404);
            }
        } else {
            return response()->json(['error' => 'Schedule not found'], 404);
        }

        // Optionally, you can return a response, like a redirect or a JSON response
        return response()->json([
            'message' => 'Reservation created successfully',
            'reservation_id' => $reservation->id // Return the ID of the new booking
        ], 201);
    }

    public function show()
    {
        try {
            // Get the currently authenticated user
            $user = auth()->user();

            // Check if the user is authenticated
            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }

            // Retrieve reservations for the authenticated user
            $reservations = Reservation::where('user_id', $user->id)
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
