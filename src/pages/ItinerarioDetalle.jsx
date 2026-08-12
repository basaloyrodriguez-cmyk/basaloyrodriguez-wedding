import { Link } from 'react-router-dom';

// TODO: página pendiente de diseño final del itinerario detallado — el
// placeholder "Próximamente..." de abajo es intencional, no un error.
export function ItinerarioDetalle() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 4rem', minHeight: '100dvh' }}>
      <Link to="/" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--clr-navy)', opacity: 0.7 }}>
        &larr; Volver
      </Link>
      <h2 className="script-accent text-center mb-2" style={{ marginTop: '2rem' }}>Itinerario del Día</h2>
      <p className="text-center" style={{ color: 'var(--clr-text-muted)' }}>
        Próximamente encontrarás aquí el detalle completo del itinerario.
      </p>
    </div>
  );
}
