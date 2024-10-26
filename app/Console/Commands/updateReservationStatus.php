<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reservation;
use App\Models\Schedule;
use App\Models\Bus;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class updateReservationStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reservations:update-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $timezone = 'Asia/Kolkata';
        $now = Carbon::now()->setTimezone($timezone);

        $reservations = Reservation::where(DB::raw('CONCAT(booking_date, " ", arrival_time)'), '<', $now->toDateTimeString())
            ->whereIn('status', ['paid'])
            ->get();

        // Now, update the status for those records
        $reservations->each(function ($reservation) {
            $reservation->status = 'completed';
            $reservation->save();
        });

        if ($reservations->isEmpty()) {
            $this->info('No reservations to update.');
            return;
        }

        foreach ($reservations as $reservation) {

            // Update the bus table to remove reserved seats
            $schedule = Schedule::find($reservation->schedule_id);
            if ($schedule) {
                $bus = Bus::find($schedule->bus_id);
                if ($bus) {
                    // Remove the reserved seats
                    $reservedSeats = explode(',', $bus->reserved_seats);
                    $cancelledSeats = explode(',', $reservation->reserved_seats);

                    // Get the remaining reserved seats
                    $remainingSeats = array_diff($reservedSeats, $cancelledSeats);
                    $bus->reserved_seats = implode(',', $remainingSeats);
                    $bus->save();
                } else {
                    $this->error('Bus not found for reservation ID: ' . $reservation->id);
                }
            } else {
                $this->error('Schedule not found for reservation ID: ' . $reservation->id);
            }
        }


        $this->info('Reservation statuses updated successfully.');
    }
}
