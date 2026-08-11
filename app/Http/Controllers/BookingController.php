<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Guest;
use App\Models\Room;
use Illuminate\Http\Request;
use Carbon\Carbon;

class BookingController extends Controller
{
    /**
     * Display a listing of all booking requests with optional status filter.
     */
    public function index(Request $request)
    {
        $query = Booking::with(['guest', 'room']);

        // Filter by booking status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search by guest name or room number
        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('guest', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            })->orWhereHas('room', function ($q) use ($search) {
                $q->where('room_no', 'like', "%{$search}%");
            });
        }

        $bookings = $query->latest()->paginate(10);

        // Metrics for summary cards
        $metrics = [
            'total_revenue'   => Booking::where('status', '!=', 'cancelled')->sum('total_amount'),
            'pending_count'   => Booking::where('status', 'pending')->count(),
            'checked_in_count'=> Booking::where('status', 'checked_in')->count(),
            'total_rooms'     => Room::count(),
            'occupied_rooms'  => Room::where('status', 'occupied')->count(),
        ];

        $metrics['occupancy_rate'] = $metrics['total_rooms'] > 0 
            ? round(($metrics['occupied_rooms'] / $metrics['total_rooms']) * 100) 
            : 0;

        return view('bookings.index', compact('bookings', 'metrics'));
    }

    /**
     * Show the form for creating a new booking request.
     */
    public function create()
    {
        $rooms = Room::where('status', 'available')->get();
        return view('bookings.create', compact('rooms'));
    }

    /**
     * Store a newly created booking request in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'guest_name'       => 'required|string|max:255',
            'guest_email'      => 'required|email|max:255',
            'guest_phone'      => 'required|string|max:20',
            'guest_address'    => 'nullable|string|max:500',
            'room_id'          => 'required|exists:rooms,id',
            'check_in'         => 'required|date|after_or_equal:today',
            'check_out'        => 'required|date|after:check_in',
            'special_requests' => 'nullable|string|max:1000'
        ]);

        // Find or create guest profile
        $guest = Guest::firstOrCreate(
            ['email' => $validated['guest_email']],
            [
                'name'    => $validated['guest_name'],
                'phone'   => $validated['guest_phone'],
                'address' => $validated['guest_address'] ?? null,
            ]
        );

        $room = Room::findOrFail($validated['room_id']);

        // Calculate nights and total amount
        $checkIn  = Carbon::parse($validated['check_in']);
        $checkOut = Carbon::parse($validated['check_out']);
        $nights   = $checkIn->diffInDays($checkOut) ?: 1;
        $totalAmount = $nights * $room->price_per_night;

        $booking = Booking::create([
            'guest_id'         => $guest->id,
            'room_id'          => $room->id,
            'check_in'         => $validated['check_in'],
            'check_out'        => $validated['check_out'],
            'total_amount'     => $totalAmount,
            'status'           => 'pending',
            'special_requests' => $validated['special_requests'] ?? null,
        ]);

        return redirect()->route('bookings.index')
            ->with('success', 'Booking request #' . $booking->id . ' submitted successfully!');
    }

    /**
     * Display the specified booking details.
     */
    public function show(Booking $booking)
    {
        $booking->load(['guest', 'room']);
        return view('bookings.show', compact('booking'));
    }

    /**
     * Update booking status and synchronize room availability status.
     */
    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,checked_in,checked_out,cancelled'
        ]);

        $newStatus = $validated['status'];
        $booking->status = $newStatus;
        $booking->save();

        // Automatic room status synchronization logic
        $room = $booking->room;
        if ($room) {
            if ($newStatus === 'checked_in') {
                $room->update(['status' => 'occupied']);
            } elseif (in_array($newStatus, ['checked_out', 'cancelled'])) {
                // Verify if room has another active checked_in booking
                $hasOtherActive = Booking::where('room_id', $room->id)
                    ->where('id', '!=', $booking->id)
                    ->where('status', 'checked_in')
                    ->exists();

                if (!$hasOtherActive) {
                    $room->update(['status' => 'available']);
                }
            }
        }

        return back()->with('success', 'Booking #' . $booking->id . ' status updated to ' . strtoupper(str_replace('_', ' ', $newStatus)));
    }

    /**
     * Remove the specified booking request from storage.
     */
    public function destroy(Booking $booking)
    {
        $bookingId = $booking->id;
        $booking->delete();

        return back()->with('success', 'Booking request #' . $bookingId . ' has been deleted.');
    }
}
