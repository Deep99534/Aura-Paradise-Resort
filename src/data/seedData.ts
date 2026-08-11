import type { Room, Guest, Booking } from '../types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-101',
    room_no: '101',
    room_type: 'Deluxe',
    price_per_night: 4500,
    capacity: 2,
    status: 'occupied',
    amenities: ['King Bed', 'Ocean View', 'Free Wi-Fi', 'Mini Bar', 'Air Conditioning'],
    description: 'Spacious room with breathtaking ocean view and luxury king bed.',
    image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'room-102',
    room_no: '102',
    room_type: 'Executive Suite',
    price_per_night: 8500,
    capacity: 3,
    status: 'occupied',
    amenities: ['Living Room', 'Jacuzzi', 'Private Balcony', 'Butler Service', 'High-Speed Wi-Fi'],
    description: 'Elite executive suite featuring private balcony and luxury jacuzzi tub.',
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'room-201',
    room_no: '201',
    room_type: 'Standard',
    price_per_night: 2800,
    capacity: 2,
    status: 'available',
    amenities: ['Queen Bed', 'Garden View', 'Wi-Fi', 'TV', 'Tea/Coffee Maker'],
    description: 'Cozy standard room ideal for business travelers and couples.',
    image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'room-202',
    room_no: '202',
    room_type: 'Deluxe',
    price_per_night: 4800,
    capacity: 2,
    status: 'available',
    amenities: ['Twin Beds', 'Pool View', 'Smart TV', 'Balcony', 'Mini Fridge'],
    description: 'Modern deluxe room overlooking the resort swimming pool.',
    image_url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'room-301',
    room_no: '301',
    room_type: 'Presidential Suite',
    price_per_night: 15000,
    capacity: 4,
    status: 'available',
    amenities: ['Master Bedroom', 'Private Pool', 'Dining Area', 'Personal Chef', 'VIP Airport Transfer'],
    description: 'Ultra-luxurious presidential suite with private plunge pool and 360-degree resort views.',
    image_url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'room-302',
    room_no: '302',
    room_type: 'Villa',
    price_per_night: 12000,
    capacity: 6,
    status: 'maintenance',
    amenities: ['3 Bedrooms', 'Private Garden', 'Kitchenette', 'BBQ Grill', 'Direct Beach Access'],
    description: 'Secluded beachfront villa perfect for families and retreats.',
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_GUESTS: Guest[] = [
  {
    id: 'guest-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra',
    total_stays: 3,
    created_at: '2026-08-01'
  },
  {
    id: 'guest-2',
    name: 'Anita Kumar',
    email: 'anita.k@example.com',
    phone: '+91 98123 45678',
    address: 'Bengaluru, Karnataka',
    total_stays: 2,
    created_at: '2026-08-03'
  },
  {
    id: 'guest-3',
    name: 'David Miller',
    email: 'david.m@example.com',
    phone: '+1 415 555 0199',
    address: 'San Francisco, CA, USA',
    total_stays: 1,
    created_at: '2026-08-05'
  },
  {
    id: 'guest-4',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91 99000 11223',
    address: 'Ahmedabad, Gujarat',
    total_stays: 4,
    created_at: '2026-08-08'
  },
  {
    id: 'guest-5',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    phone: '+65 9123 4567',
    address: 'Singapore',
    total_stays: 1,
    created_at: '2026-08-10'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1001',
    guest_id: 'guest-1',
    room_id: 'room-101',
    check_in: '2026-08-11',
    check_out: '2026-08-14',
    total_amount: 13500,
    status: 'checked_in',
    special_requests: 'Honeymoon setup with flower decorations.',
    created_at: '2026-08-05'
  },
  {
    id: 'bk-1002',
    guest_id: 'guest-2',
    room_id: 'room-102',
    check_in: '2026-08-10',
    check_out: '2026-08-13',
    total_amount: 25500,
    status: 'checked_in',
    special_requests: 'Late check-out requested at 2:00 PM.',
    created_at: '2026-08-06'
  },
  {
    id: 'bk-1003',
    guest_id: 'guest-3',
    room_id: 'room-301',
    check_in: '2026-08-15',
    check_out: '2026-08-18',
    total_amount: 45000,
    status: 'confirmed',
    special_requests: 'Airport pickup required.',
    created_at: '2026-08-08'
  },
  {
    id: 'bk-1004',
    guest_id: 'guest-4',
    room_id: 'room-202',
    check_in: '2026-08-16',
    check_out: '2026-08-19',
    total_amount: 14400,
    status: 'pending',
    special_requests: 'Extra bed for child.',
    created_at: '2026-08-11'
  },
  {
    id: 'bk-1005',
    guest_id: 'guest-5',
    room_id: 'room-201',
    check_in: '2026-08-01',
    check_out: '2026-08-04',
    total_amount: 8400,
    status: 'checked_out',
    special_requests: 'High floor preferred.',
    created_at: '2026-07-28'
  }
];
