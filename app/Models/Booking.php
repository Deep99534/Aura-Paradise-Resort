<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'guest_id',
        'room_id',
        'check_in',
        'check_out',
        'total_amount',
        'status',
        'special_requests'
    ];

    protected $casts = [
        'check_in' => 'date',
        'check_out' => 'date',
        'total_amount' => 'decimal:2'
    ];

    /**
     * Relationship: A booking belongs to a guest.
     */
    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }

    /**
     * Relationship: A booking belongs to a room.
     */
    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
