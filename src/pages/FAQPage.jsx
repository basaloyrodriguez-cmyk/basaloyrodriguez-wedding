import React from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '../components/ui/NavBar';
import { Footer } from '../components/Footer';
import { BotanicalCorners, SectionSeparator } from '../components/ui/Decorations';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: '¿A qué hora debo llegar a la iglesia?',
    a: 'La ceremonia inicia puntualmente a las 3:00 PM. Se recomienda llegar con 20-30 minutos de anticipación para tomar asiento cómodamente.'
  },
  {
    q: '¿Puedo llevar un acompañante no incluido en mi invitación?',
    a: 'Por razones de capacidad del lugar y logística de las mesas, solo podemos recibir a los invitados explícitamente indicados en el pase digital de tu invitación.'
  },
  {
    q: '¿Es un evento para niños?',
    a: 'Para permitir a todos nuestros invitados disfrutar de una velada de celebración, hemos organizado una recepción exclusivamente para adultos.'
  },
  {
    q: '¿Habrá estacionamiento disponible?',
    a: 'Sí, tanto en la Iglesia San Francisco de la Caleta como en el Hotel JW Marriott hay disponibilidad de estacionamiento y servicio de Valet Parking.'
  },
  {
    q: '¿Cuál es la fecha límite para confirmar mi asistencia (RSVP)?',
    a: 'Por favor confirma tu asistencia antes del 10 de Septiembre de 2026 a través del formulario de la página web.'
  }
];

export function FAQPage() {
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
          <h1 className="title-hero" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '0.5rem' }}>Preguntas Frecuentes</h1>
          <p className="script-accent" style={{ fontSize: '2rem', color: 'var(--clr-olive)' }}>Todo lo que necesitas saber</p>
        </motion.div>

        <SectionSeparator />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '3rem 0' }}>
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="panel"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--clr-navy)' }}>
                <HelpCircle size={20} style={{ color: 'var(--clr-olive)', flexShrink: 0 }} />
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>{faq.q}</h3>
              </div>
              <p style={{ color: 'var(--clr-text-muted)', lineHeight: '1.7', paddingLeft: '1.75rem' }}>
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
