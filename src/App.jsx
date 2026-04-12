import { useState } from 'react';
import { CoverPage } from './components/CoverPage';
import { HeroSection } from './components/HeroSection';
import { Countdown } from './components/Countdown';
import { LocationCard } from './components/LocationCard';
import { RSVPSection } from './components/RSVPSection';
import { Footer } from './components/Footer';

export default function App() {
  // guest = invitados row | null
  // companions = invitados rows linked via parentesco_invitados
  const [guest, setGuest] = useState(null);
  const [companions, setCompanions] = useState([]);

  const handleEnter = (guestRecord, companionList) => {
    setGuest(guestRecord);
    setCompanions(companionList);
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
    </div>
  );
}
