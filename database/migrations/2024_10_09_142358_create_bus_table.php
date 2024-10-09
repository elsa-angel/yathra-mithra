<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bus', function (Blueprint $table) {
            $table->id(); // Adds an auto-incrementing primary key column named 'id'
            $table->char('bus_name', 100); // Adds a CHAR column for bus_name
            $table->integer('num_seats'); // Adds an INT column for num_seats
            $table->string('reserved_seats'); // Adds an INT column for reserved_seats
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bus');
    }
}
