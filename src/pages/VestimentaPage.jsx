import React from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '../components/ui/NavBar';
import { Footer } from '../components/Footer';
import { BotanicalCorners, SectionSeparator } from '../components/ui/Decorations';
import { Shirt, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function VestimentaPage() {
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
          <h1 className="title-hero" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '0.5rem' }}>Código de Vestimenta</h1>
          <p className="script-accent" style={{ fontSize: '2rem', color: 'var(--clr-olive)' }}>Elegante / Formal</p>
        </motion.div>

        <SectionSeparator />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', margin: '3rem 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="panel"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--clr-navy)' }}>
              <Shirt size={28} />
              <h3 style={{ fontSize: '1.5rem' }}>Damas</h3>
            </div>
            <p style={{ color: 'var(--clr-text-muted)', lineHeight: '1.8' }}>
              Vestido largo de gala. Recomendamos colores vivos, profundos y vibrantes; preferible usar colores lisos y evitar estampados.
              Por respeto a la tradición, solicitamos amablemente evitar el color blanco, crema o marfil.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="panel"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--clr-navy)' }}>
              <Sparkles size={28} />
              <h3 style={{ fontSize: '1.5rem' }}>Caballeros</h3>
            </div>
            <p style={{ color: 'var(--clr-text-muted)', lineHeight: '1.8' }}>
              Tuxedo / Esmoquin o Traje oscuro formal completo con corbata o corbatín.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--clr-light-blue)',
              border: '1px solid rgba(2, 47, 99, 0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}
          >
            <AlertCircle size={24} style={{ color: 'var(--clr-navy)', flexShrink: 0, marginTop: '0.2rem' }} />
            <p style={{ color: 'var(--clr-navy)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Tanto la ceremonia como la recepción se realizarán en recintos climatizados con aire acondicionado.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
