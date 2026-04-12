import { Heart } from 'lucide-react';
import { WEDDING_DATA } from '../constants/weddingData';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-hearts">♥ ♥ ♥</div>
      <p className="footer-names">{WEDDING_DATA.coupleDisplay}</p>
      <p className="footer-date">{WEDDING_DATA.dateDisplay}</p>
      <p className="footer-copy">
        Creado con <Heart size={13} className="footer-heart-icon" fill="currentColor" /> para
        nuestra boda
      </p>
    </footer>
  );
}
