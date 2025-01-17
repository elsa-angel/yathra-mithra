<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use Carbon\Carbon;

class ScheduleSearchController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming requestcom
        $request->validate([
            'from' => 'required|string',
            'to' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);

        // Retrieve the validated input data
        $data = $request->only(['from', 'to', 'date', 'time']);

        $dayOfWeek = Carbon::parse($data['date'])->format('l'); // Get the day name

        $schedules = Schedule::where(function ($query) use ($data) {
            $query->where('stops', 'like', "%{$data['from']}%")
                ->where('stops', 'like', "%{$data['to']}%")
                ->whereRaw("FIND_IN_SET('{$data['from']}', stops) < FIND_IN_SET('{$data['to']}', stops)");
        })
            ->where(function ($query) use ($dayOfWeek) {
                $query->where('running_days', 'like', '%' . $dayOfWeek . '%');
            })
            ->where(function ($query) use ($data) {
                // string of times like "08:00,10:00,12:00"
                $query->where('stops_timings', 'like', "%{$data['time']}%");
            })
            ->with('bus') // Eager load the bus relationship
            ->get();


        // Filter schedules based on the exact time position
        $schedules = $schedules->filter(function ($schedule) use ($data) {
            // Extract stops and timings
            $stopsArray = explode(',', $schedule->stops);
            $timingsArray = explode(',', $schedule->stops_timings);

            // Find the index of the 'from' stop
            $fromIndex = array_search(trim($data['from']), array_map('trim', $stopsArray));

            // Check if the index is valid and if the corresponding timing matches
            return $fromIndex !== false
                && isset($timingsArray[$fromIndex])
                && trim($timingsArray[$fromIndex]) === $data['time'];
        });


        // Transform the response to include only matching data
        $response = $schedules->map(function ($schedule) use ($data) {
            return [
                'id' => $schedule->id,
                'from' => $data['from'],
                'to' => $data['to'],
                'date' => $data['date'],
                'time' => $data['time'],
                'bus_id' => $schedule->bus_id,
                'bus_details' => $schedule->bus,
                'stops' => $schedule->stops,
                'stops_timings' => $schedule->stops_timings,
                'stops_distance' => $schedule->stops_distance,
                'running_days' => $schedule->running_days,
            ];
        });

        return response()->json($response, 200);

    }
}

// dd($schedules);
