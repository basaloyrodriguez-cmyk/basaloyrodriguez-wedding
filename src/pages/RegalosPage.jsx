import React from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '../components/ui/NavBar';
import { Footer } from '../components/Footer';
import { BotanicalCorners, SectionSeparator } from '../components/ui/Decorations';
import { Gift, CreditCard, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RegalosPage() {
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
          <h1 className="title-hero" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '0.5rem' }}>Mesa de Regalos</h1>
          <p className="script-accent" style={{ fontSize: '2rem', color: 'var(--clr-olive)' }}>Su presencia es nuestro mayor regalo</p>
        </motion.div>

        <SectionSeparator />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', margin: '3rem 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="panel text-center"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}
          >
            <Heart size={40} style={{ color: 'var(--clr-navy)' }} />
            <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px' }}>
              Lo más importante para nosotros es contar con tu presencia en este día tan especial. Si deseas realizarnos un detalle adicional, agradecemos tu contribución al inicio de nuestro hogar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="panel"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--clr-navy)' }}>
              <CreditCard size={28} />
              <h3 style={{ fontSize: '1.5rem' }}>Datos Bancarios / Yappi</h3>
            </div>

            <div style={{ background: 'var(--clr-light-blue)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem' }}>
              <div>
                <strong>Banco General (Panamá)</strong>
                <p style={{ color: 'var(--clr-text-muted)' }}>Cuenta de Ahorros: 04-72-99-XXXXXX-X</p>
                <p style={{ color: 'var(--clr-text-muted)' }}>A nombre de: Juan Basalo / Maria Rodríguez</p>
              </div>
              <hr style={{ borderColor: 'rgba(2, 47, 99, 0.1)', margin: '0.5rem 0' }} />
              <div>
                <strong>Yappi / Nequi</strong>
                <p style={{ color: 'var(--clr-text-muted)' }}>Teléfono: +507 6000-0000</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--clr-navy)', marginTop: '1rem' }}>
              <Gift size={28} />
              <h3 style={{ fontSize: '1.5rem' }}>Lluvia de Sobres</h3>
            </div>
            <p style={{ color: 'var(--clr-text-muted)', lineHeight: '1.7' }}>
              El día de la recepción contaremos con un buzón de sobres en la entrada del salón.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
