import { WEDDING_DATA } from '../constants/weddingData';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import openLetterVideo from '../assets/open_letter.mp4';

export function HeroSection() {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-gif-container"
        style={{ position: 'relative' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <video
          src={openLetterVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-label="Abriendo la invitación"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9, x: '-50%', y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1.2 },
            x: { duration: 0 },
            y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }
          }}
          style={{
            position: 'absolute',
            bottom: '6px',
            left: '50%',
            display: 'flex',
            filter: 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.35))'
          }}
        >
          <ChevronDown size={38} color="#ffffff" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
