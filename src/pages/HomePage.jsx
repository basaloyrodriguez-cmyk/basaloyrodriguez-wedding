import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CoverPage } from '../components/CoverPage';
import { HeroSection } from '../components/HeroSection';
import { Countdown } from '../components/Countdown';
import { RSVPSection } from '../components/RSVPSection';
import { Footer } from '../components/Footer';
import { RoleModal } from '../components/ui/RoleModal';
import { BotanicalCorners, SectionSeparator } from '../components/ui/Decorations';
import { NavBar } from '../components/ui/NavBar';
import { AccommodationsModal } from '../components/AccommodationsModal';
import { motion } from 'framer-motion';
import { useGuest } from '../context/GuestContext';
import { Music, HelpCircle, Calendar, ArrowRight } from 'lucide-react';

function InstagramIcon({ size = 32, color = "#e1306c" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

import itinerarioImg from '../assets/itinerario.png';
import nicePicUs from '../assets/nice_pic_us.jpg';
import invitationImg from '../assets/invitation.png';

export function HomePage() {
  const { guest, companions, specialMessage, loginGuest, setSpecialMessage } = useGuest();
  const [showAccommodations, setShowAccommodations] = useState(false);

  if (!guest) {
    return <CoverPage onEnter={loginGuest} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="invitation-page"
      style={{ position: 'relative', overflowX: 'hidden' }}
    >
      <NavBar onOpenAccommodations={() => setShowAccommodations(true)} />

      {/* Background decorations */}
      <BotanicalCorners />

      {/* 1. GIF & Hero */}
      <HeroSection />

      <main className="invitation-main" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        {/* 2. Foto de nosotros (nice_pic_us - extremo a extremo) */}
        <motion.div
          id="nosotros"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ paddingTop: '0.5rem', textAlign: 'center' }}
        >
          <div className="full-bleed" style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
            <img
              src={nicePicUs}
              alt="Juan & Andrea"
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </div>
        </motion.div>

        <SectionSeparator />

        {/* 3. Invitación oficial (invitation.png) */}
        <motion.div
          id="invitacion-oficial"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ paddingTop: '2rem', textAlign: 'center' }}
        >
          <div className="full-bleed" style={{
            backgroundColor: '#fcfcfc',
            overflow: 'hidden',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'center',
            padding: '1rem 0'
          }}>
            <img
              src={invitationImg}
              alt="Invitación Oficial de Boda"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxWidth: '1200px',
                transform: 'scale(1.06)',
                margin: '0 auto'
              }}
            />
          </div>
        </motion.div>

        <SectionSeparator />

        {/* 4. Countdown */}
        <div id="cuenta-regresiva" style={{ paddingTop: '3rem' }}>
          <Countdown />
        </div>

        <SectionSeparator />

        {/* 5. Foto del Itinerario (extremo a extremo) con Botón Ver Más */}
        <motion.div
          id="itinerario"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ paddingTop: '3rem', textAlign: 'center' }}
        >
          <div className="full-bleed" style={{ backgroundColor: '#fcfcfc', overflow: 'hidden' }}>
            <Link to="/itinerario" style={{ display: 'block' }}>
              <motion.img
                src={itinerarioImg}
                alt="Itinerario del día — toca para ver el detalle"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', cursor: 'pointer', display: 'block' }}
              />
            </Link>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/itinerario" className="btn btn--primary" style={{ gap: '0.5rem' }}>
              Ver Itinerario Completo <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        <SectionSeparator />

        {/* 6. El RSVP */}
        <div id="rsvp" style={{ paddingTop: '3rem', marginBottom: '4rem' }}>
          <RSVPSection guest={guest} companions={companions} />
        </div>
      </main>

      {/* 7. Sección en Gris Oscuro (Playlist, Instagram, Preguntas Frecuentes) */}
      <section style={{
        backgroundColor: '#1e2530',
        color: '#ffffff',
        padding: '4rem 1.5rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.2rem',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '2.5rem',
            letterSpacing: '0.03em'
          }}>
            Información Adicional
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Playlist */}
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '1.75rem 1.25rem',
                textAlign: 'center',
                transition: 'transform 0.3s, background 0.3s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
            >
              <Music size={32} style={{ color: '#b0c074' }} />
              <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontFamily: 'var(--font-sans)' }}>Playlist de la Boda</h3>
              <p style={{ color: '#a0aec0', fontSize: '0.85rem' }}>¡Recomiéndanos tus canciones favoritas para la fiesta!</p>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '1.75rem 1.25rem',
                textAlign: 'center',
                transition: 'transform 0.3s, background 0.3s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
            >
              <InstagramIcon size={32} color="#e1306c" />
              <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontFamily: 'var(--font-sans)' }}>Instagram de la Boda</h3>
              <p style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Usa nuestro hashtag oficial y comparte tus fotos</p>
            </a>

            {/* Preguntas Frecuentes */}
            <Link
              to="/preguntas-frecuentes"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '1.75rem 1.25rem',
                textAlign: 'center',
                transition: 'transform 0.3s, background 0.3s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
            >
              <HelpCircle size={32} style={{ color: '#63b3ed' }} />
              <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontFamily: 'var(--font-sans)' }}>Preguntas Frecuentes</h3>
              <p style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Resuelve tus dudas sobre itinerarios, transporte y más</p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      {specialMessage && (
        <RoleModal
          message={specialMessage}
          onClose={() => setSpecialMessage(null)}
        />
      )}

      <AccommodationsModal
        isOpen={showAccommodations}
        onClose={() => setShowAccommodations(false)}
      />
    </motion.div>
  );
}
