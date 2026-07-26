import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function NavBar({ onOpenAccommodations }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
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
        padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
        background: scrolled ? 'rgba(249, 247, 242, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(2, 47, 99, 0.05)' : 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        justifyContent: 'center' // Center the entire nav block
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
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '1.25rem', 
            color: 'var(--clr-navy)', 
            cursor: 'pointer',
            fontWeight: 600,
            letterSpacing: '0.1em'
          }}
        >
          B&R
        </div>

        {/* Desktop Links (Hidden on very small screens, or handled via responsive CSS. For this editorial design, we'll keep it simple) */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Historia', 'Itinerario', 'Ubicaciones', 'RSVP'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--clr-navy)',
                opacity: 0.7,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = 1}
              onMouseLeave={(e) => e.target.style.opacity = 0.7}
            >
              {item}
            </button>
          ))}
          
          <button 
            className="btn btn--secondary" 
            style={{ height: '2.5rem', padding: '0 1.5rem', fontSize: '0.75rem', marginLeft: '1rem' }}
            onClick={onOpenAccommodations}
          >
            Hospedaje
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
