import React, { useState } from 'react';
import type { Room, RoomStatus, RoomType } from '../types';
import { BedDouble, Plus, Users, Wrench, ShieldCheck } from 'lucide-react';

interface RoomManagementProps {
  rooms: Room[];
  onAddRoom: (roomData: Omit<Room, 'id'>) => void;
  onUpdateRoomStatus: (roomId: string, status: RoomStatus) => void;
}

export const RoomManagement: React.FC<RoomManagementProps> = ({
  rooms,
  onAddRoom,
  onUpdateRoomStatus
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomNo, setRoomNo] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('Deluxe');
  const [pricePerNight, setPricePerNight] = useState('4500');
  const [capacity, setCapacity] = useState('2');
  const [amenitiesStr, setAmenitiesStr] = useState('King Bed, Ocean View, Wi-Fi, Mini Bar');
  const [description, setDescription] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNo || !pricePerNight) return;

    onAddRoom({
      room_no: roomNo,
      room_type: roomType,
      price_per_night: parseFloat(pricePerNight),
      capacity: parseInt(capacity, 10),
      status: 'available',
      amenities: amenitiesStr.split(',').map((s) => s.trim()).filter(Boolean),
      description,
      image_url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'
    });

    setRoomNo('');
    setDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BedDouble size={20} color="#f59e0b" /> Room Inventory & Status
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Manage hotel rooms, pricing, amenities, and current availability status.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-gold">
          <Plus size={18} /> Add New Room
        </button>
      </div>

      {/* Room Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {rooms.map((room) => (
          <div key={room.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            
            {/* Image Banner */}
            <div style={{ position: 'relative', height: '160px', overflow: 'hidden', background: '#0f172a' }}>
              <img
                src={room.image_url || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'}
                alt={`Room ${room.room_no}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px'
              }}>
                <span className={`badge badge-${room.status}`}>
                  {room.status === 'available' && <ShieldCheck size={12} />}
                  {room.status === 'occupied' && <Users size={12} />}
                  {room.status === 'maintenance' && <Wrench size={12} />}
                  {room.status.toUpperCase()}
                </span>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                background: 'rgba(11, 19, 41, 0.85)',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#f59e0b'
              }}>
                Room {room.room_no}
              </div>
            </div>

            {/* Room Details Body */}
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                    {room.room_type}
                  </h3>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>
                    ₹{room.price_per_night.toLocaleString()} <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/night</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px', minHeight: '36px' }}>
                  {room.description || 'Luxury resort accommodation equipped with premium guest amenities.'}
                </p>

                {/* Amenities Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {room.amenities.map((amenity, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.7rem',
                        padding: '3px 8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      ✓ {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Update Quick Action */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Status Control:</span>
                <select
                  className="select"
                  style={{ width: 'auto', padding: '4px 10px', fontSize: '0.78rem', height: '32px' }}
                  value={room.status}
                  onChange={(e) => onUpdateRoomStatus(room.id, e.target.value as RoomStatus)}
                >
                  <option value="available">🟢 Available</option>
                  <option value="occupied">🔴 Occupied</option>
                  <option value="maintenance">🟡 Maintenance</option>
                </select>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Add Room Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(5, 10, 20, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Add New Resort Room</h3>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Room Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 401"
                  className="input"
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Room Category</label>
                <select
                  className="select"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value as RoomType)}
                >
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Executive Suite">Executive Suite</option>
                  <option value="Presidential Suite">Presidential Suite</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Price per Night (₹)</label>
                  <input
                    type="number"
                    required
                    className="input"
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Max Capacity</label>
                  <input
                    type="number"
                    required
                    className="input"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Amenities (comma separated)</label>
                <input
                  type="text"
                  className="input"
                  value={amenitiesStr}
                  onChange={(e) => setAmenitiesStr(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Description</label>
                <textarea
                  rows={2}
                  className="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
