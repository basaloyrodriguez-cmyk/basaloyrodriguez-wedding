import { WEDDING_DATA } from '../constants/weddingData';
import { motion } from 'framer-motion';
import openLetterGif from '../assets/open_letter.gif';

export function HeroSection() {
  return (
    <section style={{ 
      position: 'relative',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto 3rem auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img
          src={openLetterGif}
          alt="Abriendo la invitación"
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '700px' }}
      >
        <span style={{ 
          fontFamily: 'var(--font-sans)', 
          fontSize: '0.8rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.2em',
          color: 'var(--clr-text-muted)',
          display: 'block',
          marginBottom: '1rem'
        }}>
          {WEDDING_DATA.tagline}
        </span>

        <h2 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
          color: 'var(--clr-navy)', 
          lineHeight: 1.1,
          marginBottom: '2rem'
        }}>
          {WEDDING_DATA.coupleFullDisplay}
        </h2>

        <p style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '1.25rem', 
          color: 'var(--clr-text-muted)', 
          fontStyle: 'italic',
          lineHeight: 1.8
        }}>
          "{WEDDING_DATA.message}"
        </p>
      </motion.div>
    </section>
  );
}
