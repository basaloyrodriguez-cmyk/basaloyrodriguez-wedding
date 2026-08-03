import { Routes, Route } from 'react-router-dom';
import { GuestProvider } from './context/GuestContext';
import { HomePage } from './pages/HomePage';
import { ItinerarioDetalle } from './pages/ItinerarioDetalle';
import { VestimentaPage } from './pages/VestimentaPage';
import { HospedajePage } from './pages/HospedajePage';
import { AsientosPage } from './pages/AsientosPage';
import { RegalosPage } from './pages/RegalosPage';
import { FAQPage } from './pages/FAQPage';

export default function App() {
  return (
    <GuestProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/itinerario" element={<ItinerarioDetalle />} />
        <Route path="/vestimenta" element={<VestimentaPage />} />
        <Route path="/hospedaje" element={<HospedajePage />} />
        <Route path="/asientos" element={<AsientosPage />} />
        <Route path="/regalos" element={<RegalosPage />} />
        <Route path="/preguntas-frecuentes" element={<FAQPage />} />
      </Routes>
    </GuestProvider>
  );
}
