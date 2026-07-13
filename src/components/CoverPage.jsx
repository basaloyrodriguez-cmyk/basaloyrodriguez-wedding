import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { WEDDING_DATA } from '../constants/weddingData';
import { GuestSearchInput } from './ui/GuestSearchInput';
import { motion, AnimatePresence } from 'framer-motion';

export function CoverPage({ onEnter }) {
  const [step, setStep] = useState('hero'); // 'hero' | 'search' | 'opening'
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [error, setError] = useState('');

  const handleStart = () => setStep('search');

  const handleGuestSelect = (guest) => {
    setSelectedGuest(guest);
    setError('');
  };

  const handleOpen = async () => {
    if (!selectedGuest) return;
    setStep('opening');
    setError('');

    try {
      const { data: parentescos } = await supabase
        .from('parentesco_invitados')
        .select('invitado_acompanante_id')
        .eq('invitado_principal_id', selectedGuest.id);

      let companions = [];
      if (parentescos && parentescos.length > 0) {
        const ids = parentescos.map((p) => p.invitado_acompanante_id);
        const { data: companionData } = await supabase
          .from('invitados')
          .select('*')
          .in('id', ids);
        companions = companionData ?? [];
      }

      let specialMessage = null;
      const { data: guestRoles } = await supabase
        .from('invitado_roles')
        .select('rol_id')
        .eq('invitado_id', selectedGuest.id);

      if (guestRoles && guestRoles.length > 0) {
        const { data: messages } = await supabase
          .from('mensajes_rol')
          .select('*')
          .in('rol_id', guestRoles.map((r) => r.rol_id));
        
        if (messages && messages.length > 0) {
          specialMessage = messages[0];
        }
      }

      // Wait 2.5 seconds total for the envelope animation before continuing
      setTimeout(() => {
        onEnter(selectedGuest, companions, specialMessage);
      }, 2500);

    } catch (err) {
      console.error('Error abriendo invitación:', err);
      setError('Hubo un problema de conexión. Por favor intenta de nuevo.');
      setStep('search');
    }
  };

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'var(--clr-white)',
      backgroundImage: step === 'opening' 
        ? 'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\" opacity=\\"0.04\\"/%3E%3C/svg%3E")'
        : 'none',
      transition: 'all 2s ease'
    }}>
      
      {/* Dynamic Background Blur / Zoom during opening */}
      <motion.div 
        animate={{ 
          filter: step === 'opening' ? 'blur(10px)' : 'blur(0px)',
          scale: step === 'opening' ? 1.05 : 1
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(2, 47, 99, 0.03) 100%)'
        }}
      />

      <AnimatePresence mode="wait">
        
        {/* STEP 1: HERO */}
        {step === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '800px' }}
          >
            <h1 className="title-hero mb-1">
              Juan Manuel<br/>& Maria Andrea
            </h1>
            <p className="script-accent mb-2">Nuestra historia comienza aquí</p>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--clr-text-muted)', letterSpacing: '0.1em', marginBottom: '3rem' }}>
              10 DE OCTUBRE, 2026
            </p>
            <button className="btn btn--primary" onClick={handleStart}>
              Abrir Invitación
            </button>
          </motion.div>
        )}

        {/* STEP 2: SEARCH */}
        {step === 'search' && (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="panel"
            style={{ width: '100%', maxWidth: '450px', zIndex: 1, textAlign: 'center' }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Para entregar tu invitación</h2>
            <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Por favor, escribe tu nombre y apellido tal como aparece en el sobre.</p>
            
            <GuestSearchInput
              onSelect={handleGuestSelect}
              onClear={() => setSelectedGuest(null)}
              disabled={false}
            />

            <AnimatePresence>
              {selectedGuest && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginTop: '2rem', overflow: 'hidden' }}
                >
                  <p style={{ color: 'var(--clr-olive)', fontSize: '0.9rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                    ¡Encontrado! Hola, {selectedGuest.nombre}.
                  </p>
                  <button className="btn btn--primary" style={{ width: '100%' }} onClick={handleOpen}>
                    Descubrir Detalles
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {error && <p style={{ color: 'var(--clr-error)', marginTop: '1rem', fontSize: '0.85rem' }}>{error}</p>}
          </motion.div>
        )}

        {/* STEP 3: OPENING ENVELOPE (Visual representation) */}
        {step === 'opening' && (
          <motion.div
            key="opening"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
            className="panel"
            style={{ 
              width: '100%', 
              maxWidth: '500px', 
              zIndex: 2, 
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <h2 className="title-hero" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Juan Manuel<br/>& Maria Andrea
            </h2>
            <p className="script-accent" style={{ fontSize: '2rem', color: 'var(--clr-text-faint)' }}>Te invitan a su boda</p>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              style={{ height: '1px', background: 'var(--clr-navy)', opacity: 0.2, margin: '2rem auto' }}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
