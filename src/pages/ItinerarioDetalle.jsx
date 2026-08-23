import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavBar } from '../components/ui/NavBar';
import { Footer } from '../components/Footer';
import { BotanicalCorners, SectionSeparator } from '../components/ui/Decorations';
import calizIcon from '../assets/caliz.png';
import anillosIcon from '../assets/anillos.png';
import copasIcon from '../assets/copas.png';
import palomaIcon from '../assets/paloma.png';

const EVENTOS = [
  {
    fecha: 'Jueves 8 de octubre',
    titulo: 'Adoración Eucarística',
    lugar: 'Parroquia Santa Eduviges',
    hora: '8:00 PM',
    icon: calizIcon,
  },
  {
    fecha: 'Sábado 10 de octubre',
    titulo: 'Ceremonia Eclesial',
    lugar: 'Parroquia San Francisco de Asís de La Caleta',
    hora: '3:00 PM',
    icon: anillosIcon,
  },
  {
    fecha: 'Sábado 10 de octubre',
    titulo: 'Recepción',
    lugar: 'Hotel JW Marriot',
    hora: '5:30 PM',
    icon: copasIcon,
  },
  {
    fecha: 'Domingo 11 de octubre',
    titulo: 'Misa Dominical',
    lugar: 'Santuario Nacional',
    hora: '4:00 PM',
    icon: palomaIcon,
  },
];

export function ItinerarioDetalle() {
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

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '6.5rem 1.5rem 4rem 1.5rem', position: 'relative', zIndex: 1 }}>
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
          <h1 className="title-hero" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '0.5rem' }}>Itinerario</h1>
          <p className="script-accent" style={{ fontSize: '2rem', color: 'var(--clr-olive)' }}>Nuestro fin de semana</p>
        </motion.div>

        <SectionSeparator />

        <div style={{ position: 'relative', paddingLeft: '3.5rem', margin: '3rem 0' }}>
          {/* Línea continua que atraviesa todos los eventos */}
          <div style={{
            position: 'absolute',
            left: '1.25rem',
            top: '0.25rem',
            bottom: '0.25rem',
            width: '2px',
            background: 'rgba(2, 47, 99, 0.15)'
          }} />

          {EVENTOS.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              style={{ position: 'relative', paddingBottom: i < EVENTOS.length - 1 ? '3rem' : 0 }}
            >
              <div style={{
                position: 'absolute',
                left: '-3.5rem',
                top: 0,
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                background: 'var(--clr-white-pure)',
                border: '2px solid var(--clr-navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}>
                <img src={ev.icon} alt="" style={{ width: '1.4rem', height: '1.4rem', objectFit: 'contain' }} />
              </div>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--clr-text-muted)', marginBottom: '0.25rem' }}>
                {ev.fecha}
              </p>
              <h3 className="script-accent" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{ev.titulo}</h3>
              <p style={{ color: 'var(--clr-navy)', fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>{ev.lugar}</p>
              <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem' }}>{ev.hora}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
