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

        // First, get the reservations that should be completed
        $reservations = Reservation::where(DB::raw('CONCAT(booking_date, " ", arrival_time)'), '<', $now->toDateTimeString())
            ->whereIn('status', ['paid', 'started'])
            ->get();

        // Update status to 'completed' for those reservations
        $reservations->each(function ($reservation) {
            $reservation->status = 'completed';
            $reservation->save();
        });

        // Check if there were any reservations to update to 'completed'
        if ($reservations->isEmpty()) {
            $this->info('No reservations to update.');
        }

        // Get reservations that should be marked as 'started'
        // These should not overlap with the 'completed' ones
        $reservationsStarted = Reservation::where(DB::raw('CONCAT(booking_date, " ", departure_time)'), '<', $now->toDateTimeString())
            ->whereIn('status', ['paid'])
            ->get();

        // Update status to 'started' for those reservations
        $reservationsStarted->each(function ($reservation) {
            $reservation->status = 'started';
            $reservation->save();
        });

        // Check if there were any reservations to update to 'started'
        if ($reservationsStarted->isEmpty()) {
            $this->info('No reservations to start.');
        }

        // Final success message
        $this->info('Reservation statuses updated successfully.');
    }

}
