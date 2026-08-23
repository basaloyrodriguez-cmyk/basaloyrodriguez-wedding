import { Routes, Route } from 'react-router-dom';
import { GuestProvider } from './context/GuestContext';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { VestimentaPage } from './pages/VestimentaPage';
import { HospedajePage } from './pages/HospedajePage';
import { AsientosPage } from './pages/AsientosPage';
import { RegalosPage } from './pages/RegalosPage';
import { FAQPage } from './pages/FAQPage';

export default function App() {
  return (
    <GuestProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vestimenta" element={<VestimentaPage />} />
        <Route path="/hospedaje" element={<HospedajePage />} />
        <Route path="/asientos" element={<AsientosPage />} />
        <Route path="/regalos" element={<RegalosPage />} />
        <Route path="/preguntas-frecuentes" element={<FAQPage />} />
      </Routes>
    </GuestProvider>
  );
}
