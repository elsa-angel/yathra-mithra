<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reservation;
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

        // Reservation::where(DB::raw('DATE(CONCAT(booking_date, " ", departure_time))'), '<', $now)
        Reservation::where(DB::raw('CONCAT(booking_date, " ", departure_time)'), '<', $now->toDateTimeString())
            ->whereNotIn('status', ['completed', 'cancelled']) // Exclude completed and cancelled
            ->update(['status' => 'completed']);




        $this->info('Reservation statuses updated successfully.');
    }
}
