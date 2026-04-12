import { WEDDING_DATA } from '../constants/weddingData';

export function HeroSection() {
  return (
    <section className="hero">
      {/* Background photo */}
      <div className="hero-bg">
        <img
          src={WEDDING_DATA.heroBgUrl}
          alt="Foto de boda"
          className="hero-img"
        />
        <div className="hero-overlay" />
      </div>

      {/* Content */}
      <div className="hero-content animate-fade-in">
        <span className="hero-badge">{WEDDING_DATA.tagline}</span>

        <h1 className="hero-title">{WEDDING_DATA.coupleFullDisplay}</h1>

        <div className="hero-divider">
          <span className="hero-divider-line" />
          <span className="hero-divider-heart">♥</span>
          <span className="hero-divider-line" />
        </div>

        <p className="hero-message">{WEDDING_DATA.message}</p>
      </div>
    </section>
  );
}
