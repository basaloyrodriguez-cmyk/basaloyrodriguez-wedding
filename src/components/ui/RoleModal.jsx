import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function RoleModal({ message, onClose }) {
  if (!message) return null;

  let imageUrl = null;
  if (message.picture_name) {
    try {
      imageUrl = new URL(`../../assets/${message.picture_name}`, import.meta.url).href;
    } catch (err) {
      console.error('Error loading image', message.picture_name);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(2, 47, 99, 0.85)', // Dark Navy translucent
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          style={{
            background: 'var(--clr-white-pure)',
            borderRadius: 'var(--radius-sm)',
            maxWidth: '500px',
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'var(--clr-white)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--clr-navy)',
              zIndex: 10,
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {imageUrl && (
            <div style={{ width: '100%', height: '350px', overflow: 'hidden' }}>
              <img 
                src={imageUrl} 
                alt={message.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          )}

          <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--clr-navy)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              {message.title}
            </h2>
            <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', fontStyle: 'italic', lineHeight: 1.8 }}>
              {message.content}
            </p>
            
            <button className="btn btn--primary" onClick={onClose}>
              ¡Con mucho gusto!
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
