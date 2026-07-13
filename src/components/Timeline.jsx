import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

const events = [
  {
    title: 'Ceremonia Religiosa',
    time: '3:00 PM',
    location: 'San Francisco de la Caleta',
    description: 'Acompáñanos a dar el "Sí, acepto".'
  },
  {
    title: 'Recepción y Fiesta',
    time: '5:30 PM',
    location: 'Hotel JW Marriott, Piso 66',
    description: 'Celebremos juntos esta nueva etapa.'
  }
];

export function Timeline() {
  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="script-accent text-center mb-2">Itinerario</h2>
      
      <div style={{ position: 'relative', marginTop: '3rem' }}>
        {/* Central Line */}
        <div 
          style={{ 
            position: 'absolute', 
            left: '50%', 
            top: 0, 
            bottom: 0, 
            width: '1px', 
            background: 'var(--clr-navy)', 
            opacity: 0.2,
            transform: 'translateX(-50%)'
          }} 
        />
        
        {events.map((event, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: index * 0.2 }}
            style={{ 
              display: 'flex', 
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              alignItems: 'center',
              marginBottom: '4rem',
              position: 'relative'
            }}
          >
            {/* Event Content */}
            <div style={{ width: '50%', padding: index % 2 === 0 ? '0 2rem 0 0' : '0 0 0 2rem', textAlign: index % 2 === 0 ? 'right' : 'left' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--clr-navy)', marginBottom: '0.5rem' }}>
                {event.title}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start', gap: '0.5rem', color: 'var(--clr-text-muted)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                <Clock size={14} />
                <span>{event.time}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start', gap: '0.5rem', color: 'var(--clr-text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                <MapPin size={14} />
                <span>{event.location}</span>
              </div>
              
              <p style={{ color: 'var(--clr-text-faint)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                {event.description}
              </p>
            </div>
            
            {/* Center Node */}
            <div 
              style={{ 
                position: 'absolute', 
                left: '50%', 
                width: '10px', 
                height: '10px', 
                background: 'var(--clr-white)', 
                border: '1px solid var(--clr-navy)',
                borderRadius: '50%',
                transform: 'translate(-50%, 0)'
              }} 
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
