import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gem, Hotel, Armchair, Gift } from 'lucide-react';

const TABS = [
  { label: 'Vestimenta', path: '/vestimenta', Icon: Gem },
  { label: 'Hospedaje', path: '/hospedaje', Icon: Hotel },
  { label: 'Asientos', path: '/asientos', Icon: Armchair },
  { label: 'Regalos', path: '/regalos', Icon: Gift },
];

export function BottomTabBar() {
  const location = useLocation();

  return (
    <nav
      className="nav-tabbar-mobile"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#022f63', // Blue from our palette
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.2)',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0.6rem 0'
      }}
    >
      {TABS.map(({ label, path, Icon }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: isActive ? '#b0c074' : '#ffffff',
              opacity: isActive ? 1 : 0.8,
              transition: 'all 0.2s ease',
              textDecoration: 'none'
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
