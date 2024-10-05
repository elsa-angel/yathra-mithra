<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/my_bookings', function () {
    return Inertia::render('MyBookings');
})->name('my_bookings');

Route::get('/e-wallet', function () {
    return Inertia::render('E-Wallet');
})->name('e-wallet');

Route::get('/schedule_list', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('schedule_list');

Route::get('/reservation/{booking_id}', function (string $booking_id) {
    return Inertia::render('Reservation', [
        'booking_id' => $booking_id
    ]);
})->middleware(['auth', 'verified'])->name('reservation');

Route::get('/reservation_failed', function () {
    return Inertia::render('Reservation_Failed', );
})->middleware(['auth', 'verified'])->name('reservation_failed');


Route::get('/payment', function () {
    return Inertia::render('Payment');
})->name('payment');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/searchg', function () {
    return Inertia::render('ScheduleGuest');
})->name('searchg');

require __DIR__ . '/auth.php';
