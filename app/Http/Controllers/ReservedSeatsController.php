<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Booking;
use App\Models\Reservation;
use App\Models\Schedule;  // Add the Schedule model
use Illuminate\Http\Request;

class ReservedSeatsController extends Controller
{
    public function show($booking_id)
    {
        try {
            // Find the booking by its ID
            $booking = Booking::findOrFail($booking_id);  // This will automatically throw a ModelNotFoundException if the booking is not found

            // Get the schedule_id, booking_date, departure_stop, and arrival_stop from the booking
            $scheduleId = $booking->schedule_id;
            $bookingDate = $booking->booking_date;
            $departureStop = $booking->departure_stop;
            $arrivalStop = $booking->arrival_stop;

            // Retrieve the stops for the given schedule_id from the Schedule model
            $schedule = Schedule::findOrFail($scheduleId);
            $stops = explode(',', $schedule->stops);  // Assuming 'stops' is a comma-separated string in the Schedule model

            // Find existing reserved seats from the Reservation table for the same schedule and booking date
            $existingReservations = Reservation::where('schedule_id', $scheduleId)
                ->where('booking_date', $bookingDate)
                // ->where('status', 'paid')
                ->whereIn('status', ['paid', 'started'])
                ->get();  // Get all reservations with 'paid' status

            // Filter the reservations based on departure and arrival stop logic
            $filteredReservations = $existingReservations->filter(function ($reservation) use ($departureStop, $arrivalStop, $stops) {
                // Split the stops from the reservation and the current booking into arrays
                // The stops are already available in the 'stops' array from the Schedule model
                $departureIndex = array_search($reservation->departure_stop, $stops);
                $arrivalIndex = array_search($reservation->arrival_stop, $stops);

                // Get indices for the current booking's departure and arrival stops
                $currentDepartureIndex = array_search($departureStop, $stops);
                $currentArrivalIndex = array_search($arrivalStop, $stops);

                // dd(
                //     $reservation,
                //     $departureIndex,
                //     $arrivalIndex,
                //     $currentDepartureIndex,
                //     $currentArrivalIndex,

                //     !($currentDepartureIndex >= $arrivalIndex || $currentArrivalIndex <= $departureIndex)
                // );

                // Check if the departure and arrival stop conditions match
                return !($currentDepartureIndex >= $arrivalIndex || $currentArrivalIndex <= $departureIndex);

                // return !($currentDepartureIndex <= $departureIndex || $currentArrivalIndex >= $arrivalIndex);
            });

            // Get reserved seats for the filtered reservations
            $reservedSeats = $filteredReservations->pluck('reserved_seats')->toArray();

            // Return the result (or further process as necessary)
            return response()->json([
                'schedule_id' => $scheduleId,
                'booking_date' => $bookingDate,
                'reserved_seats' => $reservedSeats
            ]);

        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Booking details not found'], 404);
        }
    }
}
