<?php

namespace App\Http\Controllers;


use App\Models\Bus;
use Illuminate\Http\Request;

class BusDetailsController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'bus_name' => 'required|string',
            'num_seats' => 'required|numeric',
            'reserved_seats' => 'required|string',
        ]);
    }

}
