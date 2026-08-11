<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;

/*
|--------------------------------------------------------------------------
| Web Routes - Hotel/Resort Booking Management System
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return redirect()->route('bookings.index');
});

// Resource routes for Bookings
Route::resource('bookings', BookingController::class);

// Custom PATCH route for status lifecycle updates
Route::patch('/bookings/{booking}/status', [BookingController::class, 'updateStatus'])
    ->name('bookings.updateStatus');
