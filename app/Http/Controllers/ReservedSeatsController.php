<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Booking;
use App\Models\Reservation;
use App\Models\Schedule;
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
                ->whereIn('status', ['paid', 'started']) // Only considering 'paid' or 'started' reservations
                ->get();

            // Filter the reservations based on departure and arrival stop logic
            $filteredReservations = $existingReservations->filter(function ($reservation) use ($departureStop, $arrivalStop, $stops) {
                // Split the stops from the reservation and the current booking into arrays
                $departureIndex = array_search($reservation->departure_stop, $stops);
                $arrivalIndex = array_search($reservation->arrival_stop, $stops);

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


                // Check if the reservation overlaps with the current booking's departure and arrival stops
                return !($currentDepartureIndex >= $arrivalIndex || $currentArrivalIndex <= $departureIndex);
            });

            // Get reserved seats for the filtered reservations
            $reservedSeats = $filteredReservations->pluck('reserved_seats')->toArray();

            // Now, block the reserved seats of other users by combining the reserved seats for this schedule
            $blockedSeats = [];
            foreach ($reservedSeats as $seats) {
                $blockedSeats = array_merge($blockedSeats, explode(',', $seats));  // Merge each reserved seat from different users
            }

            // Remove duplicate seat numbers, ensuring each seat is blocked only once
            $blockedSeats = array_unique($blockedSeats);

            // Return the result including the blocked seats
            return response()->json([
                'schedule_id' => $scheduleId,
                'booking_date' => $bookingDate,
                'reserved_seats' => $blockedSeats,  // Return blocked (reserved) seats for this booking
            ]);

        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Booking details not found'], 404);
        }
    }
}
