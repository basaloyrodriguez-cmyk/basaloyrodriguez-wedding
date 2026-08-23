import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { WEDDING_DATA } from '../constants/weddingData';
import { GuestSearchInput } from './ui/GuestSearchInput';
import { motion, AnimatePresence } from 'framer-motion';
import logoWedding from '../assets/logo_wedding.png';

export function CoverPage({ onEnter }) {
  const [step, setStep] = useState('hero'); // 'hero' | 'search' | 'opening'
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [error, setError] = useState('');
  const searchInputRef = useRef(null);

  const handleStart = () => setStep('search');

  const handleGuestSelect = (guest) => {
    setSelectedGuest(guest);
    setError('');
  };

  const handleOpen = async (guestOverride) => {
    const guest = guestOverride ?? selectedGuest;
    if (!guest) return;
    setStep('opening');
    setError('');

    try {
      const { data: parentescos } = await supabase
        .from('parentesco_invitados')
        .select('invitado_acompanante_id')
        .eq('invitado_principal_id', guest.id);

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
        .eq('invitado_id', guest.id);

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
        onEnter(guest, companions, specialMessage);
      }, 2500);

    } catch (err) {
      console.error('Error abriendo invitación:', err);
      setError('Hubo un problema de conexión. Por favor intenta de nuevo.');
      setStep('search');
    }
  };

  const handlePrimaryAction = async () => {
    if (selectedGuest) {
      handleOpen();
      return;
    }
    const guest = await searchInputRef.current?.submit();
    if (guest) {
      handleOpen(guest);
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
            <img
              src={logoWedding}
              alt="Basalo & Rodríguez"
              style={{ width: '140px', height: 'auto', margin: '0 auto 1.5rem', display: 'block' }}
            />
            <h1 className="title-hero mb-2">
              Basalo<br/>& Rodríguez
            </h1>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--clr-navy)', letterSpacing: '0.1em', marginBottom: '3rem' }}>
              10 DE OCTUBRE, 2026
            </p>
            <button className="btn btn--primary" style={{ fontSize: '1.05rem', padding: '0 3.5rem' }} onClick={handleStart}>
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
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Abre tu invitación</h2>
            <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.05rem', marginBottom: '0.35rem' }}>Por favor, escribe tu nombre y apellido</p>
            <p style={{ color: 'var(--clr-text-faint)', fontSize: '0.8rem', marginBottom: '2rem', fontStyle: 'italic' }}>Tal y como te escribieron al contactarte</p>
            
            <GuestSearchInput
              ref={searchInputRef}
              onSelect={handleGuestSelect}
              onClear={() => setSelectedGuest(null)}
              disabled={false}
            />

            <AnimatePresence>
              {selectedGuest && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ color: 'var(--clr-olive)', fontSize: '0.9rem', marginTop: '1.5rem', fontStyle: 'italic', overflow: 'hidden' }}
                >
                  Hola, {selectedGuest.nombre}.
                </motion.p>
              )}
            </AnimatePresence>

            <button className="btn btn--primary" style={{ width: '100%', marginTop: '2rem' }} onClick={handlePrimaryAction}>
              Abrir invitación
            </button>

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
              Basalo<br/>& Rodríguez
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
