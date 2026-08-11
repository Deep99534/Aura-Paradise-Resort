import { useState, useEffect } from 'react';
import type { Booking, Room, Guest, BookingStatus, RoomStatus } from './types';
import { storageService } from './services/storageService';
import { Header } from './components/Header';
import { DashboardStats } from './components/DashboardStats';
import { BookingList } from './components/BookingList';
import { RoomManagement } from './components/RoomManagement';
import { GuestList } from './components/GuestList';
import { AnalyticsView } from './components/AnalyticsView';
import { BookingModal } from './components/BookingModal';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'rooms' | 'guests' | 'analytics'>('dashboard');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);

  // Load data on initial mount
  const refreshData = () => {
    setBookings(storageService.getBookings());
    setRooms(storageService.getRooms());
    setGuests(storageService.getGuests());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handlers
  const handleUpdateStatus = (bookingId: string, newStatus: BookingStatus) => {
    const updated = storageService.updateBookingStatus(bookingId, newStatus);
    setBookings(updated);
    setRooms(storageService.getRooms());
    showToast(`Booking ${bookingId} status updated to ${newStatus.replace('_', ' ').toUpperCase()}`);
  };

  const handleDeleteBooking = (bookingId: string) => {
    const updated = storageService.deleteBooking(bookingId);
    setBookings(updated);
    showToast(`Booking ${bookingId} deleted successfully.`);
  };

  const handleAddRoom = (roomData: Omit<Room, 'id'>) => {
    storageService.addRoom(roomData);
    setRooms(storageService.getRooms());
    showToast(`New Room ${roomData.room_no} (${roomData.room_type}) added!`);
  };

  const handleUpdateRoomStatus = (roomId: string, status: RoomStatus) => {
    const r = rooms.find((x) => x.id === roomId);
    if (r) {
      storageService.updateRoom({ ...r, status });
      setRooms(storageService.getRooms());
      showToast(`Room ${r.room_no} status changed to ${status.toUpperCase()}`);
    }
  };

  const handleBookingCreated = () => {
    refreshData();
    showToast('✨ Booking request submitted successfully!');
  };

  const analytics = storageService.getAnalytics();

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '48px' }}>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="animate-fade-in" style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 2000,
          background: 'rgba(16, 185, 129, 0.95)',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
          fontWeight: 600,
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={18} /> {toastMessage}
        </div>
      )}

      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewBooking={() => setIsBookingModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        pendingCount={analytics.pendingCount}
      />

      <main className="container">
        
        {/* KPI Stats Bar (Shown on Dashboard & Analytics tabs) */}
        {(activeTab === 'dashboard' || activeTab === 'analytics') && (
          <DashboardStats
            analytics={analytics}
            selectedStatus={selectedStatus}
            setSelectedStatus={(status) => {
              setSelectedStatus(status);
              setActiveTab('bookings');
            }}
            onOpenNewBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {/* Tab Switch Views */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <BookingList
              bookings={bookings}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              searchQuery={searchQuery}
              onUpdateStatus={handleUpdateStatus}
              onDeleteBooking={handleDeleteBooking}
            />
            <AnalyticsView analytics={analytics} bookings={bookings} rooms={rooms} />
          </div>
        )}

        {activeTab === 'bookings' && (
          <BookingList
            bookings={bookings}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            searchQuery={searchQuery}
            onUpdateStatus={handleUpdateStatus}
            onDeleteBooking={handleDeleteBooking}
          />
        )}

        {activeTab === 'rooms' && (
          <RoomManagement
            rooms={rooms}
            onAddRoom={handleAddRoom}
            onUpdateRoomStatus={handleUpdateRoomStatus}
          />
        )}

        {activeTab === 'guests' && (
          <GuestList guests={guests} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView analytics={analytics} bookings={bookings} rooms={rooms} />
        )}

      </main>

      {/* Modal for New Booking Request */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        rooms={rooms}
        onBookingCreated={handleBookingCreated}
      />
    </div>
  );
}

export default App;
