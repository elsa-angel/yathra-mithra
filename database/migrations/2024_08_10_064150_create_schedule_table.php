<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScheduleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('bus_id'); // Foreign key to the bus table
            $table->integer('fare'); // Fare for each schedule
            $table->char('stops'); // Stops field
            $table->char('stops_timings'); // Stops timings field
            $table->char('stops_distance');
            $table->char('running_days');
            $table->timestamps(); // Created at and updated at timestamps

            // Foreign key constraint
            $table->foreign('bus_id')->references('id')->on('bus')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule');
    }
}
