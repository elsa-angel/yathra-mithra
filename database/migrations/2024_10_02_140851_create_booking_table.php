<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('booking', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('schedule_id');
            $table->unsignedBigInteger('user_id');
            $table->char('amount');
            $table->char('reserved_seats');
            $table->char('departure_stop');
            $table->char('departure_time');
            $table->char('arrival_stop');
            $table->char('arrival_time');
            $table->timestamps(); // Created at and updated at timestamps

            // Foreign key constraint
            $table->foreign('schedule_id')->references('id')->on('schedule');
            $table->foreign('user_id')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking');
    }
};
