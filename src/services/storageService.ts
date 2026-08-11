import type { Room, Guest, Booking, BookingStatus, AnalyticsSummary } from '../types';
import { INITIAL_ROOMS, INITIAL_GUESTS, INITIAL_BOOKINGS } from '../data/seedData';

const ROOMS_KEY = 'resort_rooms_v1';
const GUESTS_KEY = 'resort_guests_v1';
const BOOKINGS_KEY = 'resort_bookings_v1';

export const storageService = {
  // Initialize LocalStorage with seed data if empty
  initialize(): void {
    if (!localStorage.getItem(ROOMS_KEY)) {
      localStorage.setItem(ROOMS_KEY, JSON.stringify(INITIAL_ROOMS));
    }
    if (!localStorage.getItem(GUESTS_KEY)) {
      localStorage.setItem(GUESTS_KEY, JSON.stringify(INITIAL_GUESTS));
    }
    if (!localStorage.getItem(BOOKINGS_KEY)) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
    }
  },

  // Rooms CRUD
  getRooms(): Room[] {
    this.initialize();
    const data = localStorage.getItem(ROOMS_KEY);
    return data ? JSON.parse(data) : INITIAL_ROOMS;
  },

  saveRooms(rooms: Room[]): void {
    localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
  },

  addRoom(roomData: Omit<Room, 'id'>): Room {
    const rooms = this.getRooms();
    const newRoom: Room = {
      ...roomData,
      id: `room-${Date.now()}`
    };
    rooms.push(newRoom);
    this.saveRooms(rooms);
    return newRoom;
  },

  updateRoom(updatedRoom: Room): void {
    const rooms = this.getRooms();
    const index = rooms.findIndex((r) => r.id === updatedRoom.id);
    if (index !== -1) {
      rooms[index] = updatedRoom;
      this.saveRooms(rooms);
    }
  },

  // Guests CRUD
  getGuests(): Guest[] {
    this.initialize();
    const data = localStorage.getItem(GUESTS_KEY);
    return data ? JSON.parse(data) : INITIAL_GUESTS;
  },

  saveGuests(guests: Guest[]): void {
    localStorage.setItem(GUESTS_KEY, JSON.stringify(guests));
  },

  addGuest(guestData: Omit<Guest, 'id' | 'created_at'>): Guest {
    const guests = this.getGuests();
    // Check if guest already exists by email
    const existing = guests.find((g) => g.email.toLowerCase() === guestData.email.toLowerCase());
    if (existing) {
      return existing;
    }
    const newGuest: Guest = {
      ...guestData,
      id: `guest-${Date.now()}`,
      total_stays: 1,
      created_at: new Date().toISOString().split('T')[0]
    };
    guests.push(newGuest);
    this.saveGuests(guests);
    return newGuest;
  },

  // Bookings CRUD
  getBookings(): Booking[] {
    this.initialize();
    const rooms = this.getRooms();
    const guests = this.getGuests();
    const rawData = localStorage.getItem(BOOKINGS_KEY);
    const bookings: Booking[] = rawData ? JSON.parse(rawData) : INITIAL_BOOKINGS;

    // Join room and guest data
    return bookings.map((b) => ({
      ...b,
      room: rooms.find((r) => r.id === b.room_id),
      guest: guests.find((g) => g.id === b.guest_id)
    }));
  },

  saveBookings(bookings: Booking[]): void {
    // Save without circular joined properties
    const cleanBookings = bookings.map(({ room, guest, ...rest }) => rest);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(cleanBookings));
  },

  createBooking(payload: {
    guest_name: string;
    guest_email: string;
    guest_phone: string;
    guest_address?: string;
    room_id: string;
    check_in: string;
    check_out: string;
    special_requests?: string;
  }): Booking {
    const rooms = this.getRooms();
    const room = rooms.find((r) => r.id === payload.room_id);
    if (!room) throw new Error('Selected room does not exist.');

    // Find or create guest
    const guest = this.addGuest({
      name: payload.guest_name,
      email: payload.guest_email,
      phone: payload.guest_phone,
      address: payload.guest_address
    });

    // Calculate nights & price
    const nights = this.calculateNights(payload.check_in, payload.check_out);
    const total_amount = nights * room.price_per_night;

    const newBooking: Booking = {
      id: `bk-${Date.now().toString().slice(-6)}`,
      guest_id: guest.id,
      room_id: room.id,
      check_in: payload.check_in,
      check_out: payload.check_out,
      total_amount,
      status: 'pending',
      special_requests: payload.special_requests,
      created_at: new Date().toISOString().split('T')[0]
    };

    const bookings = this.getBookings();
    bookings.unshift(newBooking);
    this.saveBookings(bookings);

    return {
      ...newBooking,
      room,
      guest
    };
  },

  updateBookingStatus(bookingId: string, newStatus: BookingStatus): Booking[] {
    const bookings = this.getBookings();
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return bookings;

    booking.status = newStatus;

    // Sync room status based on booking status transition
    const rooms = this.getRooms();
    const room = rooms.find((r) => r.id === booking.room_id);

    if (room) {
      if (newStatus === 'checked_in') {
        room.status = 'occupied';
      } else if (newStatus === 'checked_out' || newStatus === 'cancelled') {
        // Check if room has any other checked_in booking
        const otherCheckedIn = bookings.some(
          (b) => b.room_id === room.id && b.id !== bookingId && b.status === 'checked_in'
        );
        if (!otherCheckedIn) {
          room.status = 'available';
        }
      }
      this.saveRooms(rooms);
    }

    this.saveBookings(bookings);
    return this.getBookings();
  },

  deleteBooking(bookingId: string): Booking[] {
    const bookings = this.getBookings().filter((b) => b.id !== bookingId);
    this.saveBookings(bookings);
    return this.getBookings();
  },

  // Helper functions
  calculateNights(checkInStr: string, checkOutStr: string): number {
    const checkIn = new Date(checkInStr);
    const checkOut = new Date(checkOutStr);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  },

  getAnalytics(): AnalyticsSummary {
    const bookings = this.getBookings();
    const rooms = this.getRooms();

    const totalRevenue = bookings
      .filter((b) => b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.total_amount, 0);

    const pendingCount = bookings.filter((b) => b.status === 'pending').length;
    const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
    const checkedInCount = bookings.filter((b) => b.status === 'checked_in').length;

    const occupiedRooms = rooms.filter((r) => r.status === 'occupied').length;
    const totalRooms = rooms.length;
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

    return {
      totalRevenue,
      totalBookings: bookings.length,
      pendingCount,
      confirmedCount,
      checkedInCount,
      occupancyRate
    };
  }
};
