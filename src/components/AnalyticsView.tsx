import React from 'react';
import type { AnalyticsSummary, Booking, Room } from '../types';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

interface AnalyticsViewProps {
  analytics: AnalyticsSummary;
  bookings: Booking[];
  rooms: Room[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analytics, bookings, rooms }) => {
  // Revenue breakdown by room type
  const revenueByType = rooms.reduce((acc, room) => {
    const roomBookings = bookings.filter((b) => b.room_id === room.id && b.status !== 'cancelled');
    const rev = roomBookings.reduce((sum, b) => sum + b.total_amount, 0);
    acc[room.room_type] = (acc[room.room_type] || 0) + rev;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={20} color="#10b981" /> Resort Performance & Financial Analytics
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
          Occupancy distribution, room revenue contribution, and status metrics.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Revenue Contribution by Room Category */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: '#06b6d4' }}>
            <TrendingUp size={16} /> Revenue Contribution by Room Type
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(revenueByType).map(([type, revenue]) => {
              const pct = analytics.totalRevenue > 0 ? Math.round((revenue / analytics.totalRevenue) * 100) : 0;
              return (
                <div key={type}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>{type}</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>₹{revenue.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #06b6d4, #10b981)', borderRadius: '4px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b' }}>
            <PieChart size={16} /> Booking Request Lifecycle Distribution
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pending Confirmation</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fde047' }}>{analytics.pendingCount}</div>
            </div>

            <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Confirmed Bookings</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#67e8f9' }}>{analytics.confirmedCount}</div>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Currently Checked-In</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#6ee7b7' }}>{analytics.checkedInCount}</div>
            </div>

            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Occupancy Rate</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#818cf8' }}>{analytics.occupancyRate}%</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
