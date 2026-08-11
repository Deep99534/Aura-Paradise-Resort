import React from 'react';
import { IndianRupee, CalendarCheck, Clock, BedDouble, AlertCircle } from 'lucide-react';
import type { AnalyticsSummary } from '../types';

interface DashboardStatsProps {
  analytics: AnalyticsSummary;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  onOpenNewBooking?: () => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  analytics,
  selectedStatus,
  setSelectedStatus
}) => {
  const cards = [
    {
      title: 'Total Revenue',
      value: `₹${analytics.totalRevenue.toLocaleString()}`,
      subtitle: 'From active bookings',
      icon: IndianRupee,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.3)',
      filterKey: 'all'
    },
    {
      title: 'Pending Requests',
      value: analytics.pendingCount.toString(),
      subtitle: 'Requires admin action',
      icon: Clock,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.3)',
      filterKey: 'pending'
    },
    {
      title: 'Active Checked-In',
      value: analytics.checkedInCount.toString(),
      subtitle: 'Currently staying at resort',
      icon: CalendarCheck,
      color: '#06b6d4',
      bg: 'rgba(6, 182, 212, 0.12)',
      border: 'rgba(6, 182, 212, 0.3)',
      filterKey: 'checked_in'
    },
    {
      title: 'Occupancy Rate',
      value: `${analytics.occupancyRate}%`,
      subtitle: 'Rooms currently occupied',
      icon: BedDouble,
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.12)',
      border: 'rgba(99, 102, 241, 0.3)',
      filterKey: 'all'
    }
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isSelected = selectedStatus === card.filterKey && card.filterKey !== 'all';
          return (
            <div
              key={idx}
              className="glass-card animate-fade-in"
              onClick={() => setSelectedStatus(card.filterKey)}
              style={{
                padding: '20px',
                cursor: 'pointer',
                border: isSelected ? `2px solid ${card.color}` : `1px solid ${card.border}`,
                background: isSelected ? card.bg : 'rgba(26, 41, 77, 0.6)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {card.title}
                </span>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={card.color} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '-0.02em' }}>
                {card.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {card.subtitle}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Alert Banner if Pending Requests exist */}
      {analytics.pendingCount > 0 && (
        <div style={{
          marginTop: '16px',
          padding: '14px 20px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={20} color="#f59e0b" />
            <span style={{ fontSize: '0.9rem', color: '#fde047', fontWeight: 500 }}>
              You have <strong>{analytics.pendingCount} pending booking request(s)</strong> awaiting confirmation.
            </span>
          </div>
          <button
            onClick={() => setSelectedStatus('pending')}
            className="btn btn-sm btn-gold"
          >
            Review Pending Requests
          </button>
        </div>
      )}
    </div>
  );
};
