<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_no',
        'room_type',
        'price_per_night',
        'capacity',
        'status',
        'amenities',
        'description'
    ];

    protected $casts = [
        'amenities' => 'array',
        'price_per_night' => 'decimal:2'
    ];

    /**
     * Relationship: A room has many bookings.
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
