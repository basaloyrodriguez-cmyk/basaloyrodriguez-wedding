import { useState } from 'react';
import { CoverPage } from './components/CoverPage';
import { HeroSection } from './components/HeroSection';
import { Countdown } from './components/Countdown';
import { LocationCard } from './components/LocationCard';
import { RSVPSection } from './components/RSVPSection';
import { Footer } from './components/Footer';
import { RoleModal } from './components/ui/RoleModal';

export default function App() {
  // guest = invitados row | null
  // companions = invitados rows linked via parentesco_invitados
  // specialMessage = mensajes_rol row | null
  const [guest, setGuest] = useState(null);
  const [companions, setCompanions] = useState([]);
  const [specialMessage, setSpecialMessage] = useState(null);

  const handleEnter = (guestRecord, companionList, messageRecord) => {
    setGuest(guestRecord);
    setCompanions(companionList);
    setSpecialMessage(messageRecord);
  };

  if (!guest) {
    return <CoverPage onEnter={handleEnter} />;
  }

  return (
    <div className="invitation-page">
      <HeroSection />

      <main className="invitation-main">
        <Countdown />
        <LocationCard />
        <RSVPSection guest={guest} companions={companions} />
      </main>

      <Footer />
      
      {/* Pop-up for Special roles like "Dama de Honor" */}
      {specialMessage && (
        <RoleModal
          message={specialMessage}
          onClose={() => setSpecialMessage(null)}
        />
      )}
    </div>
  );
}
