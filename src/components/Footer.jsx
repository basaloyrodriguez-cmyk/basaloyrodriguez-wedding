import React from 'react';

export function Footer() {
  return (
    <footer style={{ 
      padding: '6rem 2rem', 
      textAlign: 'center',
      background: 'var(--clr-white)',
      borderTop: '1px solid rgba(2, 47, 99, 0.05)'
    }}>
      <p className="script-accent" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        El comienzo de nuestro siempre
      </p>
      
      <div style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '1.5rem', 
        color: 'var(--clr-navy)', 
        letterSpacing: '0.2em',
        marginBottom: '1rem'
      }}>
        J & M
      </div>
      
      <p style={{ 
        fontFamily: 'var(--font-sans)', 
        fontSize: '0.8rem', 
        color: 'var(--clr-text-faint)', 
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }}>
        10 de Octubre, 2026
      </p>
    </footer>
  );
}
