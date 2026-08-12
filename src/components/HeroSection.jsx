import { WEDDING_DATA } from '../constants/weddingData';
import { motion } from 'framer-motion';
// TODO(asset pendiente): reemplazar por un GIF con menos "relleno" azul
// arriba/abajo del sobre, para que el scroll hacia el resto de la página
// quede implícito. Sustituir openLetterGif cuando el usuario entregue el
// archivo nuevo — sin más cambios de código.
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
    </section>
  );
}
