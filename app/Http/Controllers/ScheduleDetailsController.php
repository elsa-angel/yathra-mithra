<?php

namespace App\Http\Controllers;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Schedule;

class ScheduleDetailsController extends Controller
{
    public function show($id)
    {
        try {
            $schedule = Schedule::with('bus')->findOrFail($id);
            return response()->json($schedule);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Schedule not found'], 404);
        }
    }
}
