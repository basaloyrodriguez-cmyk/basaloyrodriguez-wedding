import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, MapPin } from 'lucide-react';
import { WEDDING_DATA } from '../constants/weddingData';

export function AccommodationsModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 47, 99, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
            style={{
              background: 'var(--clr-white-pure)',
              borderRadius: 'var(--radius-sm)',
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              padding: '3rem 2rem'
            }}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'var(--clr-light-blue)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--clr-navy)',
                transition: 'background 0.2s'
              }}
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p className="script-accent" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Para nuestros invitados</p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--clr-navy)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Hospedaje Recomendado
              </h2>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
              {WEDDING_DATA.accommodations.map((hotel) => (
                <div 
                  key={hotel.id}
                  style={{
                    border: '1px solid rgba(2, 47, 99, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--clr-navy)', marginBottom: '0.25rem' }}>
                        {hotel.name}
                      </h3>
                      <p style={{ color: 'var(--clr-olive)', fontSize: '0.9rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={14} /> {hotel.distance}
                      </p>
                    </div>
                    <span style={{ 
                      background: 'var(--clr-light-blue)', 
                      color: 'var(--clr-navy)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {hotel.price}
                    </span>
                  </div>
                  
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem' }}>
                    {hotel.description}
                  </p>
                  
                  <div>
                    <a 
                      href={hotel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--secondary"
                      style={{ height: '2.5rem', padding: '0 1.5rem', fontSize: '0.8rem', width: 'fit-content', marginTop: '0.5rem' }}
                    >
                      Ver Hotel <ExternalLink size={14} style={{ marginLeft: '0.25rem' }} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <p style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--clr-text-faint)', fontSize: '0.85rem' }}>
              * Los precios son estimados y pueden variar según disponibilidad.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
