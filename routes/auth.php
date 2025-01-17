<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ScheduleSearchController;
use App\Http\Controllers\BookingDetailsController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ReservationController;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');

    Route::post('schedule_search_g', [ScheduleSearchController::class, 'store'])->name('store');

});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    Route::post('contact', [MessageController::class, 'store'])->name('store');

    Route::post('schedule_search', [ScheduleSearchController::class, 'store'])->name('store');

    Route::post('bookings', [BookingController::class, 'store'])->name('store');

    Route::patch('/bookings/{id}', [BookingController::class, 'update']);

    Route::get('bookings/{booking_id}', [BookingDetailsController::class, 'show'])->name('show');

    Route::post('reservations', [ReservationController::class, 'store'])->name('store');

    Route::get('reservations', [ReservationController::class, 'show'])->name('show');

    Route::delete('reservations/{id}', [ReservationController::class, 'destroy'])->name('destroy');

    Route::get('transactions', [ReservationController::class, 'showTransactions'])->name('showTransactions');


    // Route::delete('reservations/{id}', [ReservationController::class, 'destroy'])->name('reservations.destroy');


    // GET /users
    // GET /users/1
    // POST /users
    // PUT /users/1
    // PATCH /users/1
    // DELETE /users/1
});
