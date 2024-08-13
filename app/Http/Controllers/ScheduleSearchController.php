<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use Inertia\Inertia;

class ScheduleSearchController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'from' => 'required|string',
            'to' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);

        // Retrieve the validated input data
        $data = $request->only(['from', 'to', 'date', 'time']);

        // Fetch the schedules based on the form data
        $schedules = Schedule::all();

        // foreach ($schedules as $schedule) {
        //     // Do something with each $schedule

        // }

        // where('departure_city', $data['from'])
        // ->where('destination_city', $data['to'])
        // ->whereDate('departure_date', $data['date'])
        // ->whereTime('departure_time', $data['time'])
        // ->get()
        // ->map(function ($schedule) {
        //     // Format the schedule data as needed by your React component
        //     return [
        //         'departure_city' => $schedule->departure_city,
        //         'destination_city' => $schedule->destination_city,
        //         'departure_date' => $schedule->departure_date->format('Y-m-d'),
        //         'departure_time' => $schedule->departure_time->format('H:i'),
        //         'duration' => $schedule->duration,
        //         'fare' => $schedule->fare,
        //     ];
        // });

        // Return the data using Inertia
        // return Inertia::render('ScheduleList', [
        //     'auth' => [
        //         'user' => auth()->user(),
        //     ],
        //     'schedules' => $schedules,
        // ]);

        return response()->json($schedules, 200);

    }
}
