import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useGuest } from '../context/GuestContext';
import musicLogo from '../assets/music_log.png';

export function PlaylistSuggestions() {
  const { guest } = useGuest();
  const [suggestions, setSuggestions] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [recomendacion, setRecomendacion] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!guest?.id) return;
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from('recomendaciones_musica')
        .select('id, recomendacion, spotify_url, created_at')
        .eq('invitado_id', guest.id)
        .order('created_at', { ascending: true });

      if (cancelled) return;
      setLoadingList(false);
      if (!error && data) setSuggestions(data);
    })();

    return () => { cancelled = true; };
  }, [guest?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = recomendacion.trim();
    if (!trimmed) {
      setSubmitError('Por favor, escribe una canción o artista.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const { data, error } = await supabase
      .from('recomendaciones_musica')
      .insert({
        invitado_id: guest.id,
        recomendacion: trimmed,
        spotify_url: spotifyUrl.trim() || null,
      })
      .select('id, recomendacion, spotify_url, created_at')
      .single();

    setIsSubmitting(false);

    if (error) {
      setSubmitError('No pudimos guardar tu recomendación. Intenta de nuevo.');
      return;
    }

    setSuggestions((prev) => [...prev, data]);
    setRecomendacion('');
    setSpotifyUrl('');
  };

  if (!guest) return null;

  return (
    <div
      className="panel"
      style={{
        marginTop: '3rem',
        maxWidth: '460px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
      }}
    >
      <img
        src={musicLogo}
        alt="Playlist"
        style={{ width: '48px', height: 'auto', margin: '0 auto', display: 'block' }}
      />
      <h3 style={{ color: 'var(--clr-navy)', fontSize: '1.25rem', fontFamily: 'var(--font-sans)', margin: '0.75rem 0 1rem' }}>Playlist de la Boda</h3>
      {/* TODO(pendiente): reemplazar por el link real de la playlist de Spotify. */}
      <a
        href="https://spotify.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--clr-olive)',
          border: '1px solid var(--clr-olive)',
          borderRadius: '999px',
          padding: '0.4rem 1rem'
        }}
      >
        Ver playlist
      </a>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(2, 47, 99, 0.08)', margin: '1.5rem 0' }} />

      <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
        Recomiéndanos tus canciones favoritas para la fiesta. Puedes escribirla o pegar su link de Spotify.
      </p>

      {!loadingList && suggestions.length > 0 && (
        <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left' }}>
          {suggestions.map((s) => (
            <li key={s.id} style={{
              background: 'var(--clr-light-blue)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.6rem 1rem',
              color: 'var(--clr-navy)',
              fontSize: '0.9rem'
            }}>
              {s.recomendacion}
              {s.spotify_url && (
                <a href={s.spotify_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--clr-olive)', marginLeft: '0.5rem' }}>
                  (link)
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <input
          type="text"
          className="input-elegant"
          placeholder="Canción o artista"
          value={recomendacion}
          onChange={(e) => setRecomendacion(e.target.value)}
          style={{ fontSize: '1.1rem' }}
        />
        <input
          type="url"
          className="input-elegant"
          placeholder="Link de Spotify (opcional)"
          value={spotifyUrl}
          onChange={(e) => setSpotifyUrl(e.target.value)}
          style={{ fontSize: '1.1rem' }}
        />
        {submitError && (
          <p style={{ color: 'var(--clr-error)', fontSize: '0.85rem' }}>{submitError}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn--primary"
          style={{ alignSelf: 'center', gap: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting && <Loader2 size={16} className="spin" />}
          Enviar recomendación
        </button>
      </form>
    </div>
  );
}
