import React from 'react';
import type { Booking, BookingStatus } from '../types';
import { Calendar, Trash2, CheckCircle, Clock, XCircle, LogIn, LogOut, FileText } from 'lucide-react';

interface BookingListProps {
  bookings: Booking[];
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  searchQuery: string;
  onUpdateStatus: (bookingId: string, status: BookingStatus) => void;
  onDeleteBooking: (bookingId: string) => void;
}

export const BookingList: React.FC<BookingListProps> = ({
  bookings,
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  onUpdateStatus,
  onDeleteBooking
}) => {
  // Filter bookings based on status & search query
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = selectedStatus === 'all' || b.status === selectedStatus;
    const searchLower = searchQuery.toLowerCase();
    const guestName = b.guest?.name.toLowerCase() || '';
    const roomNo = b.room?.room_no.toLowerCase() || '';
    const guestPhone = b.guest?.phone || '';

    const matchesSearch =
      !searchQuery ||
      guestName.includes(searchLower) ||
      roomNo.includes(searchLower) ||
      guestPhone.includes(searchQuery);

    return matchesStatus && matchesSearch;
  });

  const statuses: { label: string; value: string; color: string }[] = [
    { label: 'All Requests', value: 'all', color: '#94a3b8' },
    { label: 'Pending', value: 'pending', color: '#f59e0b' },
    { label: 'Confirmed', value: 'confirmed', color: '#06b6d4' },
    { label: 'Checked-In', value: 'checked_in', color: '#10b981' },
    { label: 'Checked-Out', value: 'checked_out', color: '#64748b' },
    { label: 'Cancelled', value: 'cancelled', color: '#f43f5e' }
  ];

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return <span className="badge badge-pending"><Clock size={12} /> Pending</span>;
      case 'confirmed':
        return <span className="badge badge-confirmed"><CheckCircle size={12} /> Confirmed</span>;
      case 'checked_in':
        return <span className="badge badge-checked_in"><LogIn size={12} /> Checked-In</span>;
      case 'checked_out':
        return <span className="badge badge-checked_out"><LogOut size={12} /> Checked-Out</span>;
      case 'cancelled':
        return <span className="badge badge-cancelled"><XCircle size={12} /> Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
      {/* Header & Filter Pills */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="#06b6d4" /> Booking Requests & Status Tracker
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Manage room reservations, confirm requests, and track check-in/check-out status.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => setSelectedStatus(s.value)}
              className={`btn btn-sm ${selectedStatus === s.value ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                fontSize: '0.78rem',
                padding: '5px 12px',
                borderRadius: '20px'
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Data Table */}
      {filteredBookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
          <Calendar size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>No bookings found</h3>
          <p style={{ fontSize: '0.82rem' }}>Try clearing your search query or selecting a different status filter.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px' }}>Booking ID</th>
                <th style={{ padding: '8px 12px' }}>Guest Info</th>
                <th style={{ padding: '8px 12px' }}>Room details</th>
                <th style={{ padding: '8px 12px' }}>Check-In / Out</th>
                <th style={{ padding: '8px 12px' }}>Total Amount</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
                <th style={{ padding: '8px 12px' }}>Change Status</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr
                  key={b.id}
                  className="glass-card"
                  style={{
                    background: 'rgba(19, 31, 61, 0.5)',
                    fontSize: '0.88rem'
                  }}
                >
                  {/* ID */}
                  <td style={{ padding: '14px 12px', fontWeight: 700, color: '#06b6d4' }}>
                    {b.id}
                  </td>

                  {/* Guest */}
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{b.guest?.name || 'Unknown'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {b.guest?.phone} | {b.guest?.email}
                    </div>
                  </td>

                  {/* Room */}
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ fontWeight: 600 }}>Room {b.room?.room_no}</div>
                    <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>
                      {b.room?.room_type} (₹{b.room?.price_per_night}/nt)
                    </div>
                  </td>

                  {/* Dates */}
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 500 }}>
                      {b.check_in} → {b.check_out}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {b.special_requests ? `Req: ${b.special_requests}` : 'Standard booking'}
                    </div>
                  </td>

                  {/* Amount */}
                  <td style={{ padding: '14px 12px', fontWeight: 700, color: '#10b981' }}>
                    ₹{b.total_amount.toLocaleString()}
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: '14px 12px' }}>
                    {getStatusBadge(b.status)}
                  </td>

                  {/* Status Change Dropdown */}
                  <td style={{ padding: '14px 12px' }}>
                    <select
                      className="select"
                      style={{ padding: '4px 8px', fontSize: '0.78rem', height: '32px', cursor: 'pointer' }}
                      value={b.status}
                      onChange={(e) => onUpdateStatus(b.id, e.target.value as BookingStatus)}
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="confirmed">✓ Confirmed</option>
                      <option value="checked_in">🔑 Checked-In</option>
                      <option value="checked_out">🚪 Checked-Out</option>
                      <option value="cancelled">❌ Cancelled</option>
                    </select>
                  </td>

                  {/* Action Delete */}
                  <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete booking ${b.id}?`)) {
                          onDeleteBooking(b.id);
                        }
                      }}
                      className="btn btn-sm btn-danger"
                      title="Delete Booking"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
