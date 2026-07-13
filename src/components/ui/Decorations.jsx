import React from 'react';

// Placeholder for botanical corners
export function BotanicalCorners() {
  return (
    <>
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '300px',
          opacity: 0.08,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at top right, var(--clr-navy) 0%, transparent 70%)',
          zIndex: 0
        }} 
      />
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '300px',
          height: '300px',
          opacity: 0.08,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at bottom left, var(--clr-olive) 0%, transparent 70%)',
          zIndex: 0
        }} 
      />
    </>
  );
}

// Placeholder for section separators
export function SectionSeparator() {
  return (
    <div className="flex-center" style={{ margin: '6rem 0', opacity: 0.3 }}>
      <div style={{ width: '60px', height: '1px', background: 'var(--clr-navy)' }} />
      <span style={{ margin: '0 1.5rem', color: 'var(--clr-olive)' }}>✧</span>
      <div style={{ width: '60px', height: '1px', background: 'var(--clr-navy)' }} />
    </div>
  );
}
