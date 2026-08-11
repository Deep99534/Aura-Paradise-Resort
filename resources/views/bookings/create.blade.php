@extends('layouts.app')

@section('title', 'New Booking Request - Aura Paradise Resort')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card card-custom p-4">
            <h4 class="fw-bold mb-3"><i class="bi bi-calendar-plus text-warning"></i> Raise New Booking Request</h4>
            <hr className="border-secondary">

            @if($errors->any())
                <div class="alert alert-danger">
                    <ul class="mb-0">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('bookings.store') }}" method="POST">
                @csrf

                <!-- Guest Info -->
                <h6 class="text-info mb-3">Guest Information</h6>
                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <label class="form-label text-secondary">Full Name *</label>
                        <input type="text" name="guest_name" class="form-control bg-dark text-light border-secondary" required value="{{ old('guest_name') }}">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label text-secondary">Email Address *</label>
                        <input type="email" name="guest_email" class="form-control bg-dark text-light border-secondary" required value="{{ old('guest_email') }}">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label text-secondary">Phone Number *</label>
                        <input type="text" name="guest_phone" class="form-control bg-dark text-light border-secondary" required value="{{ old('guest_phone') }}">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label text-secondary">Address</label>
                        <input type="text" name="guest_address" class="form-control bg-dark text-light border-secondary" value="{{ old('guest_address') }}">
                    </div>
                </div>

                <!-- Room Selection & Dates -->
                <h6 class="text-warning mb-3">Room Selection & Dates</h6>
                <div class="mb-3">
                    <label class="form-label text-secondary">Select Available Room *</label>
                    <select name="room_id" class="form-select bg-dark text-light border-secondary" required>
                        <option value="">-- Choose a room --</option>
                        @foreach($rooms as $room)
                            <option value="{{ $room->id }}" {{ old('room_id') == $room->id ? 'selected' : '' }}>
                                Room {{ $room->room_no }} — {{ $room->room_type }} (₹{{ number_format($room->price_per_night, 2) }}/night)
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <label class="form-label text-secondary">Check-In Date *</label>
                        <input type="date" name="check_in" class="form-control bg-dark text-light border-secondary" required value="{{ old('check_in', date('Y-m-d')) }}">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label text-secondary">Check-Out Date *</label>
                        <input type="date" name="check_out" class="form-control bg-dark text-light border-secondary" required value="{{ old('check_out', date('Y-m-d', strtotime('+1 day'))) }}">
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label text-secondary">Special Requests</label>
                    <textarea name="special_requests" rows="2" class="form-control bg-dark text-light border-secondary" placeholder="e.g. Honeymoon setup, extra bed, late check-in...">{{ old('special_requests') }}</textarea>
                </div>

                <div class="d-flex justify-content-end gap-2 mt-4">
                    <a href="{{ route('bookings.index') }}" class="btn btn-secondary">Cancel</a>
                    <button type="submit" class="btn btn-warning">Submit Booking Request</button>
                </div>

            </form>
        </div>
    </div>
</div>
@endsection
