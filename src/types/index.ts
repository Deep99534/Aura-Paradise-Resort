export type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';

export type RoomType = 'Standard' | 'Deluxe' | 'Executive Suite' | 'Presidential Suite' | 'Villa';

export type RoomStatus = 'available' | 'occupied' | 'maintenance';

export interface Room {
  id: string;
  room_no: string;
  room_type: RoomType;
  price_per_night: number;
  capacity: number;
  status: RoomStatus;
  amenities: string[];
  description?: string;
  image_url?: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  total_stays?: number;
  created_at: string;
}

export interface Booking {
  id: string;
  guest_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  total_amount: number;
  status: BookingStatus;
  special_requests?: string;
  created_at: string;
  // Joined fields for display
  guest?: Guest;
  room?: Room;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalBookings: number;
  pendingCount: number;
  confirmedCount: number;
  checkedInCount: number;
  occupancyRate: number;
}
