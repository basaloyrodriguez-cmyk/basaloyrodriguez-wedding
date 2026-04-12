import { Calendar } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { WEDDING_DATA } from '../constants/weddingData';
import { Card } from './ui/Card';

function CountUnit({ value, label }) {
  return (
    <div className="countdown-unit">
      <span className="countdown-number">{String(value).padStart(2, '0')}</span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export function Countdown() {
  const timeLeft = useCountdown(WEDDING_DATA.dateTarget);

  return (
    <Card className="countdown-card">
      <div className="countdown-top-bar" />

      <Calendar className="countdown-icon" strokeWidth={1.5} />
      <h2 className="countdown-date">{WEDDING_DATA.dateDisplay}</h2>

      {timeLeft ? (
        <div className="countdown-grid">
          <CountUnit value={timeLeft.days} label="Días" />
          <span className="countdown-sep">:</span>
          <CountUnit value={timeLeft.hours} label="Horas" />
          <span className="countdown-sep">:</span>
          <CountUnit value={timeLeft.minutes} label="Mins" />
          <span className="countdown-sep">:</span>
          <CountUnit value={timeLeft.seconds} label="Segs" />
        </div>
      ) : (
        <p className="countdown-passed">¡El gran día ha llegado! 🎉</p>
      )}
    </Card>
  );
}
