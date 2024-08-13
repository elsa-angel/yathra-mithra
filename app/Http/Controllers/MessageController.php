<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class MessageController extends Controller
{
    //
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        //dd(session('message'));
        //dd(session()->all());

        return response()->json(['message' => 'Message Sent Successfully'], 200);

    }


}
