import React from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '../components/ui/NavBar';
import { Footer } from '../components/Footer';
import { BotanicalCorners, SectionSeparator } from '../components/ui/Decorations';
import { WEDDING_DATA } from '../constants/weddingData';
import { Link } from 'react-router-dom';
import { Hotel, ExternalLink, MapPin } from 'lucide-react';

export function HospedajePage() {
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
          <h1 className="title-hero" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '0.5rem' }}>Hospedaje</h1>
          <p className="script-accent" style={{ fontSize: '2rem', color: 'var(--clr-olive)' }}>Hoteles Recomendados</p>
          <p style={{ color: 'var(--clr-text-muted)', marginTop: '0.5rem' }}>
            Para nuestros invitados que viajan desde fuera de la ciudad o desean hospedarse cerca de los eventos.
          </p>
        </motion.div>

        <SectionSeparator />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', margin: '3rem 0' }}>
          {WEDDING_DATA.accommodations.map((hotel) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="panel"
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', color: 'var(--clr-navy)' }}>{hotel.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--clr-olive)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    <MapPin size={16} />
                    <span>{hotel.distance}</span>
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: '600', color: 'var(--clr-navy)', background: 'var(--clr-light-blue)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                  {hotel.price}
                </span>
              </div>

              <p style={{ color: 'var(--clr-text-muted)', lineHeight: '1.7' }}>
                {hotel.description}
              </p>

              <a
                href={hotel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
                style={{ alignSelf: 'flex-start', marginTop: '0.5rem', padding: '0 1.5rem', height: '2.8rem', fontSize: '0.8rem' }}
              >
                Ver Hotel <ExternalLink size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
