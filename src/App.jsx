import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ItinerarioDetalle } from './pages/ItinerarioDetalle';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/itinerario" element={<ItinerarioDetalle />} />
    </Routes>
  );
}
