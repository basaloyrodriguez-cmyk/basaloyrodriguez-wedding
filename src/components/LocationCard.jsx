import { WEDDING_DATA } from '../constants/weddingData';
import { motion } from 'framer-motion';

function PrintedVenueCard({ title, place, address, mapsUrl, image }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'var(--clr-white-pure)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid rgba(2, 47, 99, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%'
      }}
    >
      <div style={{ width: '100%', height: '250px', overflow: 'hidden', borderRadius: 'var(--radius-sm)', marginBottom: '2rem' }}>
        <motion.img 
          src={image} 
          alt={place} 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      
      <span style={{ 
        fontFamily: 'var(--font-serif)', 
        color: 'var(--clr-olive)', 
        fontSize: '1.2rem', 
        fontStyle: 'italic',
        marginBottom: '0.5rem'
      }}>
        {title}
      </span>
      
      <h4 style={{ 
        fontFamily: 'var(--font-sans)', 
        fontSize: '1.2rem', 
        color: 'var(--clr-navy)', 
        fontWeight: '500',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginBottom: '0.5rem'
      }}>
        {place}
      </h4>
      
      <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '80%' }}>
        {address}
      </p>
      
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--secondary"
        style={{ width: '100%', maxWidth: '250px' }}
      >
        Abrir Google Maps
      </a>
    </motion.div>
  );
}

export function LocationCard() {
  return (
    <div style={{ padding: '2rem 0' }}>
      <h3 className="section-title">Ubicaciones</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <PrintedVenueCard
          title="Ceremonia Religiosa"
          place={WEDDING_DATA.ceremony.place}
          address={WEDDING_DATA.ceremony.address}
          mapsUrl={WEDDING_DATA.ceremony.mapsUrl}
          image={WEDDING_DATA.ceremony.image}
        />

        <PrintedVenueCard
          title="Recepción y Fiesta"
          place={WEDDING_DATA.reception.place}
          address={WEDDING_DATA.reception.address}
          mapsUrl={WEDDING_DATA.reception.mapsUrl}
          image={WEDDING_DATA.reception.image}
        />
      </div>
    </div>
  );
}
