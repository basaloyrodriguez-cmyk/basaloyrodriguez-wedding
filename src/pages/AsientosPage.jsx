import React from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '../components/ui/NavBar';
import { Footer } from '../components/Footer';
import { BotanicalCorners, SectionSeparator } from '../components/ui/Decorations';
import { useGuest } from '../context/GuestContext';
import { Link } from 'react-router-dom';
import { Armchair, Users, Info } from 'lucide-react';

export function AsientosPage() {
  const { guest, companions } = useGuest();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="invitation-page"
      style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh' }}
    >
      <NavBar />
      <BotanicalCorners />

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '6.5rem 1.5rem 4rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--clr-navy)', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', opacity: 0.8 }}>
            ← Volver a la invitación
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-2"
        >
          <h1 className="title-hero" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '0.5rem' }}>Asignación de Asientos</h1>
          <p className="script-accent" style={{ fontSize: '2rem', color: 'var(--clr-olive)' }}>Tu Lugar en la Fiesta</p>
        </motion.div>

        <SectionSeparator />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', margin: '3rem 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="panel text-center"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
          >
            <Armchair size={48} style={{ color: 'var(--clr-navy)' }} />

            {guest ? (
              <div>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--clr-navy)', marginBottom: '0.5rem' }}>
                  {guest.nombre} {guest.apellido}
                </h3>
                {companions && companions.length > 0 && (
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.05rem', marginBottom: '1rem' }}>
                    Acompañantes: {companions.map(c => `${c.nombre} ${c.apellido}`).join(', ')}
                  </p>
                )}
                <div style={{ background: 'var(--clr-light-blue)', padding: '1rem 2rem', borderRadius: 'var(--radius-sm)', display: 'inline-block', marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--clr-text-muted)' }}>Mesa asignada</p>
                  <p style={{ fontSize: '2rem', color: 'var(--clr-navy)', fontFamily: 'var(--font-serif)', fontWeight: 'bold' }}>
                    {guest.mesa ? `Mesa ${guest.mesa}` : 'Por definir'}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.1rem' }}>
                  Los números de mesa se asignarán próximamente y aparecerán aquí, en tu invitación.
                </p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--clr-white-pure)',
              border: '1px solid rgba(2, 47, 99, 0.08)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}
          >
            <Info size={24} style={{ color: 'var(--clr-navy)', flexShrink: 0, marginTop: '0.2rem' }} />
            <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Tu mesa será asignada y comunicada a través de esta invitación, no de manera presencial en el salón.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
