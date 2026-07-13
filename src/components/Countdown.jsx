import { useCountdown } from '../hooks/useCountdown';
import { WEDDING_DATA } from '../constants/weddingData';
import { motion } from 'framer-motion';

function CountUnit({ value, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: 'clamp(3rem, 8vw, 5rem)', 
        color: 'var(--clr-navy)',
        lineHeight: 1,
        marginBottom: '0.5rem'
      }}>
        {String(value).padStart(2, '0')}
      </span>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: 'var(--clr-text-muted)'
      }}>
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const timeLeft = useCountdown(WEDDING_DATA.dateTarget);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      style={{ padding: '4rem 1rem', textAlign: 'center' }}
    >
      <h2 className="script-accent mb-2">Ya falta poco</h2>
      
      {timeLeft ? (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 5vw, 3rem)' }}>
          <CountUnit value={timeLeft.days} label="Días" />
          <CountUnit value={timeLeft.hours} label="Horas" />
          <CountUnit value={timeLeft.minutes} label="Mins" />
          <CountUnit value={timeLeft.seconds} label="Segs" />
        </div>
      ) : (
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--clr-olive)' }}>
          ¡El gran día ha llegado!
        </p>
      )}
    </motion.div>
  );
}
