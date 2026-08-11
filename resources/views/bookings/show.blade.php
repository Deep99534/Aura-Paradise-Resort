@extends('layouts.app')

@section('title', 'Booking Summary #' . $booking->id)

@section('content')
<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card card-custom p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="fw-bold mb-0">Booking Summary #{{ $booking->id }}</h4>
                <span class="badge badge-{{ $booking->status }}">
                    {{ strtoupper(str_replace('_', ' ', $booking->status)) }}
                </span>
            </div>
            <hr class="border-secondary">

            <div class="row g-4">
                <div class="col-md-6">
                    <h6 class="text-info">Guest Details</h6>
                    <p class="mb-1"><strong>Name:</strong> {{ $booking->guest->name }}</p>
                    <p class="mb-1"><strong>Email:</strong> {{ $booking->guest->email }}</p>
                    <p class="mb-1"><strong>Phone:</strong> {{ $booking->guest->phone }}</p>
                    <p class="mb-1"><strong>Address:</strong> {{ $booking->guest->address ?? 'N/A' }}</p>
                </div>

                <div class="col-md-6">
                    <h6 class="text-warning">Room & Rate Details</h6>
                    <p class="mb-1"><strong>Room Number:</strong> {{ $booking->room->room_no }}</p>
                    <p class="mb-1"><strong>Room Category:</strong> {{ $booking->room->room_type }}</p>
                    <p class="mb-1"><strong>Rate per Night:</strong> ₹{{ number_format($booking->room->price_per_night, 2) }}</p>
                </div>

                <div class="col-md-12">
                    <h6 class="text-success">Reservation Summary</h6>
                    <p class="mb-1"><strong>Check-In:</strong> {{ $booking->check_in->format('F d, Y') }}</p>
                    <p class="mb-1"><strong>Check-Out:</strong> {{ $booking->check_out->format('F d, Y') }}</p>
                    <p class="mb-1"><strong>Total Cost:</strong> ₹{{ number_format($booking->total_amount, 2) }}</p>
                    @if($booking->special_requests)
                        <p class="mb-1"><strong>Special Requests:</strong> {{ $booking->special_requests }}</p>
                    @endif
                </div>
            </div>

            <div class="mt-4 pt-3 border-top border-secondary d-flex justify-content-between">
                <a href="{{ route('bookings.index') }}" class="btn btn-secondary">Back to List</a>
            </div>
        </div>
    </div>
</div>
@endsection
