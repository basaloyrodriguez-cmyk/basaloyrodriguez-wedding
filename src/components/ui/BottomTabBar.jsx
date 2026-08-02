import { Heart, CalendarDays, MapPin, Users, Hotel } from 'lucide-react';

const TABS = [
  { label: 'Historia', id: 'historia', Icon: Heart },
  { label: 'Itinerario', id: 'itinerario', Icon: CalendarDays },
  { label: 'Ubicaciones', id: 'ubicaciones', Icon: MapPin },
  { label: 'RSVP', id: 'rsvp', Icon: Users },
];

const tabButtonStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.2rem',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.65rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--clr-navy)',
  opacity: 0.75
};

export function BottomTabBar({ onOpenAccommodations }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="nav-tabbar-mobile"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'var(--clr-white-pure)',
        borderTop: '1px solid rgba(2, 47, 99, 0.08)',
        boxShadow: '0 -4px 20px rgba(2, 47, 99, 0.06)',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0.5rem 0'
      }}
    >
      {TABS.map(({ label, id, Icon }) => (
        <button key={id} onClick={() => scrollTo(id)} style={tabButtonStyle}>
          <Icon size={20} strokeWidth={1.5} />
          {label}
        </button>
      ))}
      <button onClick={onOpenAccommodations} style={tabButtonStyle}>
        <Hotel size={20} strokeWidth={1.5} />
        Hospedaje
      </button>
    </nav>
  );
}
