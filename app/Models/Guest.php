<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address'
    ];

    /**
     * Relationship: A guest has many bookings.
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
