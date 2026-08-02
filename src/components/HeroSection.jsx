import { WEDDING_DATA } from '../constants/weddingData';
import { motion } from 'framer-motion';
import openLetterGif from '../assets/open_letter.gif';

export function HeroSection() {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-gif-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={openLetterGif}
          alt="Abriendo la invitación"
        />
      </motion.div>

      <motion.div
        className="hero-text-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        <span className="hero-tagline">
          {WEDDING_DATA.tagline}
        </span>

        <h2 className="hero-couple-title">
          {WEDDING_DATA.coupleFullDisplay}
        </h2>

        <p className="hero-message">
          "{WEDDING_DATA.message}"
        </p>
      </motion.div>
    </section>
  );
}
