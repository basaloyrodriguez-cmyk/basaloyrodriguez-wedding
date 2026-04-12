import { Heart, Music, Clock, MapPin } from 'lucide-react';
import { WEDDING_DATA } from '../constants/weddingData';
import { Card } from './ui/Card';

function VenueCard({ icon: Icon, title, time, place, address, mapsUrl, image }) {
  return (
    <div className="venue-card">
      {/* Photo */}
      <div className="venue-photo-wrap">
        <img src={image} alt={place} className="venue-photo" />
        <div className="venue-photo-overlay" />
        <span className="venue-badge">
          <Icon size={13} />
          {title}
        </span>
      </div>

      {/* Details */}
      <div className="venue-details">
        <p className="venue-time">
          <Clock size={13} />
          {time}
        </p>
        <h4 className="venue-place">{place}</h4>
        <p className="venue-address">{address}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="event-map-link"
        >
          <MapPin size={13} />
          Ver en Google Maps
        </a>
      </div>
    </div>
  );
}

export function LocationCard() {
  return (
    <Card>
      <h3 className="section-title">Dónde &amp; Cuándo</h3>

      <div className="location-venues">
        <VenueCard
          icon={Heart}
          title="Ceremonia"
          time={WEDDING_DATA.ceremony.time}
          place={WEDDING_DATA.ceremony.place}
          address={WEDDING_DATA.ceremony.address}
          mapsUrl={WEDDING_DATA.ceremony.mapsUrl}
          image={WEDDING_DATA.ceremony.image}
        />

        <VenueCard
          icon={Music}
          title="Recepción"
          time={WEDDING_DATA.reception.time}
          place={WEDDING_DATA.reception.place}
          address={WEDDING_DATA.reception.address}
          mapsUrl={WEDDING_DATA.reception.mapsUrl}
          image={WEDDING_DATA.reception.image}
        />
      </div>
    </Card>
  );
}
