import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoWedding from '../../assets/logo_wedding.png';
import { BottomTabBar } from './BottomTabBar';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const DESKTOP_NAV = [
    { label: 'Inicio', path: '/' },
    { label: 'Vestimenta', path: '/vestimenta' },
    { label: 'Hospedaje', path: '/hospedaje' },
    { label: 'Asientos', path: '/asientos' },
    { label: 'Regalos', path: '/regalos' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.75rem 1.5rem' : '1rem 1.5rem',
          background: 'rgba(252, 252, 252, 0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(2, 47, 99, 0.05)',
          transition: 'all 0.3s ease',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1000px'
        }}>
          {/* Brand / Logo */}
          <img
            src={logoWedding}
            onClick={handleLogoClick}
            alt="Basalo & Rodríguez"
            style={{ height: '40px', width: 'auto', cursor: 'pointer' }}
          />

          {/* Desktop links */}
          <div className="nav-links-desktop" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {DESKTOP_NAV.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: location.pathname === path ? 'var(--clr-olive)' : 'var(--clr-navy)',
                  fontWeight: location.pathname === path ? '600' : '400',
                  opacity: location.pathname === path ? 1 : 0.75,
                  transition: 'opacity 0.2s',
                  textDecoration: 'none'
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </motion.nav>

      <BottomTabBar />
    </>
  );
}
