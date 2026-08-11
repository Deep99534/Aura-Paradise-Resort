import React from 'react';
import { Hotel, Calendar, BedDouble, Users, BarChart3, Plus, Search } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'bookings' | 'rooms' | 'guests' | 'analytics';
  setActiveTab: (tab: 'dashboard' | 'bookings' | 'rooms' | 'guests' | 'analytics') => void;
  onOpenNewBooking: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  pendingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewBooking,
  searchQuery,
  setSearchQuery,
  pendingCount
}) => {
  return (
    <header className="glass-panel" style={{ borderRadius: '0 0 20px 20px', marginBottom: '24px' }}>
      <div className="container" style={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Logo & Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
            }}>
              <Hotel size={26} color="#ffffff" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, background: 'linear-gradient(90deg, #ffffff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Aura Paradise Resort
              </h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                Hotel & Resort Booking Management System
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(11, 19, 41, 0.6)', padding: '6px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`btn btn-sm ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none' }}
            >
              <BarChart3 size={16} /> Overview
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`btn btn-sm ${activeTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none', position: 'relative' }}
            >
              <Calendar size={16} /> Bookings
              {pendingCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#f43f5e',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('rooms')}
              className={`btn btn-sm ${activeTab === 'rooms' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none' }}
            >
              <BedDouble size={16} /> Rooms
            </button>

            <button
              onClick={() => setActiveTab('guests')}
              className={`btn btn-sm ${activeTab === 'guests' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none' }}
            >
              <Users size={16} /> Guests
            </button>
          </nav>

          {/* Search & Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search guest or room..."
                className="input"
                style={{ paddingLeft: '36px', height: '38px', fontSize: '0.85rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button onClick={onOpenNewBooking} className="btn btn-gold" style={{ height: '38px' }}>
              <Plus size={18} /> New Booking
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
