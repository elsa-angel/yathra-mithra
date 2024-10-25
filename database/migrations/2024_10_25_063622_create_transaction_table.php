<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaction', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ewallet_id');
            $table->char('type');
            $table->char('title');
            $table->integer('amount');
            $table->char('description');
            $table->char('status');
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('ewallet_id')->references('id')->on('ewallet');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction');
    }
};
