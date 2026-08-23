import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { buildIndex, findExactGuest } from '../../utils/guestSearch';

export const GuestSearchInput = forwardRef(function GuestSearchInput({ onSelect, onClear, disabled = false }, ref) {
  const [query, setQuery]         = useState('');
  const [index, setIndex]         = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [notFound, setNotFound]   = useState(false);
  const hasSelected = useRef(false);

  // Una sola descarga al montar. El componente solo se monta en el paso 'search'
  // de CoverPage, así que nada viaja hasta que el invitado abre la invitación.
  // Solo id/nombre/apellido: el correo de cada invitado no tiene por qué bajar
  // al navegador, se pide al confirmar la coincidencia exacta.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from('invitados')
        .select('id, nombre, apellido');

      if (cancelled) return;
      if (error || !data) {
        setLoadError(true);
        return;
      }
      setIndex(buildIndex(data));
    })();

    return () => { cancelled = true; };
  }, []);

  const isLoading = (!index && !loadError) || isChecking;

  const handleChange = (e) => {
    setQuery(e.target.value);
    setNotFound(false);
    if (hasSelected.current) {
      hasSelected.current = false;
      onClear?.();
    }
  };

  const runSearch = async () => {
    if (!index || isChecking) return;

    const match = findExactGuest(index, query);
    if (!match) {
      setNotFound(true);
      return;
    }

    setNotFound(false);
    hasSelected.current = true;
    setIsChecking(true);

    // El resto del flujo (RSVP, correo de confirmación) necesita correo y asistira.
    const { data } = await supabase
      .from('invitados')
      .select('id, nombre, apellido, correo, asistira')
      .eq('id', match.id)
      .single();

    setIsChecking(false);
    onSelect(data ?? match);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch();
  };

  // Permite que el botón "Abrir invitación" de CoverPage (siempre visible,
  // fuera de este componente) dispare la misma búsqueda que Enter/el ícono.
  useImperativeHandle(ref, () => ({ submit: runSearch }));

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          className="input-elegant"
          placeholder="Nombre y apellido"
          value={query}
          onChange={handleChange}
          disabled={disabled}
          autoComplete="off"
          style={{ paddingLeft: '3rem', paddingRight: '1rem', textAlign: 'left' }}
        />
        <button
          type="submit"
          aria-label="Buscar"
          disabled={disabled || !index}
          style={{ position: 'absolute', left: '1rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--clr-text-faint)', display: 'flex' }}
        >
          {isLoading ? <Loader2 size={18} className="spin" /> : <Search size={18} strokeWidth={1.5} />}
        </button>
      </form>

      {notFound && (
        <p style={{ marginTop: '0.75rem', color: 'var(--clr-error)', fontSize: '0.85rem', fontStyle: 'italic' }}>
          No encontramos ese nombre. Revísalo tal como aparece en el sobre.
        </p>
      )}
      {loadError && (
        <p style={{ marginTop: '0.75rem', color: 'var(--clr-error)', fontSize: '0.85rem', fontStyle: 'italic' }}>
          No pudimos cargar la lista. Por favor, recarga la página.
        </p>
      )}
    </div>
  );
});
