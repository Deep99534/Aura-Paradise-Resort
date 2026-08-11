@extends('layouts.app')

@section('title', 'Hotel & Resort Booking Management System')

@section('content')
<div class="row mb-4">
    <!-- Metric Cards -->
    <div class="col-md-3">
        <div class="card card-custom p-3">
            <small class="text-secondary fw-semibold">TOTAL REVENUE</small>
            <h3 class="text-success mt-1 fw-bold">₹{{ number_format($metrics['total_revenue'], 2) }}</h3>
            <small class="text-muted">From active reservations</small>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card card-custom p-3">
            <small class="text-secondary fw-semibold">PENDING REQUESTS</small>
            <h3 class="text-warning mt-1 fw-bold">{{ $metrics['pending_count'] }}</h3>
            <small class="text-muted">Requires approval</small>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card card-custom p-3">
            <small class="text-secondary fw-semibold">CHECKED-IN GUESTS</small>
            <h3 class="text-info mt-1 fw-bold">{{ $metrics['checked_in_count'] }}</h3>
            <small class="text-muted">Currently staying</small>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card card-custom p-3">
            <small class="text-secondary fw-semibold">OCCUPANCY RATE</small>
            <h3 class="text-primary mt-1 fw-bold">{{ $metrics['occupancy_rate'] }}%</h3>
            <small class="text-muted">{{ $metrics['occupied_rooms'] }} of {{ $metrics['total_rooms'] }} rooms</small>
        </div>
    </div>
</div>

@if(session('success'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <i class="bi bi-check-circle-fill"></i> {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
@endif

<div class="card card-custom p-4">
    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h4 class="mb-0 fw-bold"><i class="bi bi-list-task text-cyan"></i> Booking Requests Tracker</h4>
        
        <!-- Filter Form -->
        <form method="GET" action="{{ route('bookings.index') }}" class="d-flex gap-2">
            <select name="status" class="form-select form-select-sm bg-dark text-light border-secondary" onchange="this.form.submit()">
                <option value="all" {{ request('status') == 'all' ? 'selected' : '' }}>All Status</option>
                <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Pending</option>
                <option value="confirmed" {{ request('status') == 'confirmed' ? 'selected' : '' }}>Confirmed</option>
                <option value="checked_in" {{ request('status') == 'checked_in' ? 'selected' : '' }}>Checked-In</option>
                <option value="checked_out" {{ request('status') == 'checked_out' ? 'selected' : '' }}>Checked-Out</option>
                <option value="cancelled" {{ request('status') == 'cancelled' ? 'selected' : '' }}>Cancelled</option>
            </select>
        </form>
    </div>

    <div class="table-responsive">
        <table class="table table-dark table-hover table-dark-custom align-middle">
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Check-In / Out</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Update Status</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($bookings as $booking)
                <tr>
                    <td class="fw-bold text-info">#{{ $booking->id }}</td>
                    <td>
                        <div class="fw-semibold">{{ $booking->guest->name }}</div>
                        <small class="text-muted">{{ $booking->guest->phone }}</small>
                    </td>
                    <td>
                        <div>Room {{ $booking->room->room_no }}</div>
                        <small class="text-warning">{{ $booking->room->room_type }}</small>
                    </td>
                    <td>
                        <small>{{ $booking->check_in->format('Y-m-d') }} → {{ $booking->check_out->format('Y-m-d') }}</small>
                    </td>
                    <td class="fw-bold text-success">
                        ₹{{ number_format($booking->total_amount, 2) }}
                    </td>
                    <td>
                        <span class="badge badge-{{ $booking->status }}">
                            {{ strtoupper(str_replace('_', ' ', $booking->status)) }}
                        </span>
                    </td>
                    <td>
                        <form action="{{ route('bookings.updateStatus', $booking) }}" method="POST" class="d-flex gap-1">
                            @csrf
                            @method('PATCH')
                            <select name="status" class="form-select form-select-sm bg-dark text-light border-secondary">
                                <option value="pending" {{ $booking->status == 'pending' ? 'selected' : '' }}>Pending</option>
                                <option value="confirmed" {{ $booking->status == 'confirmed' ? 'selected' : '' }}>Confirmed</option>
                                <option value="checked_in" {{ $booking->status == 'checked_in' ? 'selected' : '' }}>Checked-In</option>
                                <option value="checked_out" {{ $booking->status == 'checked_out' ? 'selected' : '' }}>Checked-Out</option>
                                <option value="cancelled" {{ $booking->status == 'cancelled' ? 'selected' : '' }}>Cancelled</option>
                            </select>
                            <button type="submit" class="btn btn-sm btn-outline-info">Save</button>
                        </form>
                    </td>
                    <td class="text-end">
                        <form action="{{ route('bookings.destroy', $booking) }}" method="POST" onsubmit="return confirm('Delete this booking?')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                        </form>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="8" class="text-center text-muted py-4">No booking requests found.</td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-3">
        {{ $bookings->links() }}
    </div>
</div>
@endsection
