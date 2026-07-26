import { useState } from 'react';
import { CoverPage } from './components/CoverPage';
import { HeroSection } from './components/HeroSection';
import { Countdown } from './components/Countdown';
import { Timeline } from './components/Timeline';
import { LocationCard } from './components/LocationCard';
import { RSVPSection } from './components/RSVPSection';
import { Footer } from './components/Footer';
import { RoleModal } from './components/ui/RoleModal';
import { BotanicalCorners, SectionSeparator } from './components/ui/Decorations';
import { NavBar } from './components/ui/NavBar';
import { AccommodationsModal } from './components/AccommodationsModal';
import { motion } from 'framer-motion';

export default function App() {
  const [guest, setGuest] = useState(null);
  const [companions, setCompanions] = useState([]);
  const [specialMessage, setSpecialMessage] = useState(null);
  const [showAccommodations, setShowAccommodations] = useState(false);

  const handleEnter = (guestRecord, companionList, messageRecord) => {
    setGuest(guestRecord);
    setCompanions(companionList);
    setSpecialMessage(messageRecord);
  };

  if (!guest) {
    return <CoverPage onEnter={handleEnter} />;
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

      {/* Background decorations for the scrollable view */}
      <BotanicalCorners />

      <HeroSection />

      <main className="invitation-main" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <SectionSeparator />
        
        <motion.div id="historia" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ paddingTop: '5rem' }}>
          <h2 className="script-accent text-center mb-1">Nuestra Historia</h2>
          <p className="text-center" style={{ color: 'var(--clr-text-muted)', marginBottom: '2rem' }}>
            Cada paso que hemos dado nos ha traído hasta este momento.<br />
            Estamos emocionados de compartir este nuevo capítulo con ustedes.
          </p>
        </motion.div>

        <SectionSeparator />
        
        <Countdown />
        
        <SectionSeparator />

        <div id="itinerario" style={{ paddingTop: '5rem' }}>
          <Timeline />
        </div>

        <SectionSeparator />
        
        <div id="ubicaciones" style={{ paddingTop: '5rem' }}>
          <LocationCard />
        </div>
        
        <SectionSeparator />

        <div id="rsvp" style={{ paddingTop: '5rem' }}>
          <RSVPSection guest={guest} companions={companions} />
        </div>
      </main>

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
