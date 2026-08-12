import { useState, useEffect } from 'react';
import { Loader2, Music2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useGuest } from '../context/GuestContext';

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

  const fieldStyle = {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '6px',
    padding: '0.75rem 1rem',
    color: '#ffffff',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
  };

  return (
    <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <Music2 size={28} style={{ color: '#b0c074', marginBottom: '0.5rem' }} />
        <p style={{ color: '#a0aec0', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto' }}>
          Recomiéndanos tus canciones favoritas para la fiesta. Puedes escribirla o pegar su link de Spotify.
        </p>
      </div>

      {!loadingList && suggestions.length > 0 && (
        <ul style={{ listStyle: 'none', maxWidth: '460px', margin: '0 auto 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {suggestions.map((s) => (
            <li key={s.id} style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              padding: '0.6rem 1rem',
              color: '#e2e8f0',
              fontSize: '0.9rem'
            }}>
              {s.recomendacion}
              {s.spotify_url && (
                <a href={s.spotify_url} target="_blank" rel="noopener noreferrer" style={{ color: '#b0c074', marginLeft: '0.5rem' }}>
                  (link)
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: '460px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          type="text"
          placeholder="Canción o artista"
          value={recomendacion}
          onChange={(e) => setRecomendacion(e.target.value)}
          style={fieldStyle}
        />
        <input
          type="url"
          placeholder="Link de Spotify (opcional)"
          value={spotifyUrl}
          onChange={(e) => setSpotifyUrl(e.target.value)}
          style={fieldStyle}
        />
        {submitError && (
          <p style={{ color: '#e2a0a0', fontSize: '0.85rem' }}>{submitError}</p>
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
