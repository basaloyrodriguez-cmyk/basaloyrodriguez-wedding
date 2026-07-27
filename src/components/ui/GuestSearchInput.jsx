import { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { buildIndex, searchGuests } from '../../utils/guestSearch';

const EMPTY_RESULT = { status: 'need-surname', results: [] };

export function GuestSearchInput({ onSelect, onClear, disabled = false }) {
  const [query, setQuery]               = useState('');
  const [index, setIndex]               = useState(null);
  const [loadError, setLoadError]       = useState(false);
  const [isSelecting, setIsSelecting]   = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIdx, setActiveIdx]       = useState(-1);
  const inputRef    = useRef(null);
  const hasSelected = useRef(false);

  // Una sola descarga al montar. El componente solo se monta en el paso 'search'
  // de CoverPage, así que nada viaja hasta que el invitado abre la invitación.
  // Solo id/nombre/apellido: el correo de cada invitado no tiene por qué bajar
  // al navegador, se pide al seleccionar.
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

  // Filtrado síncrono: ya no hay red en el camino, así que no hace falta debounce.
  const { status, results } = useMemo(
    () => (index ? searchGuests(index, query) : EMPTY_RESULT),
    [index, query]
  );

  const isLoading = (!index && !loadError) || isSelecting;

  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
    setActiveIdx(-1);
    if (hasSelected.current) {
      hasSelected.current = false;
      onClear?.();
    }
  };

  const handleSelect = async (guest) => {
    hasSelected.current = true;
    setQuery(`${guest.nombre} ${guest.apellido}`);
    setShowDropdown(false);
    setIsSelecting(true);

    // El resto del flujo (RSVP, correo de confirmación) necesita correo y asistira.
    const { data } = await supabase
      .from('invitados')
      .select('id, nombre, apellido, correo, asistira')
      .eq('id', guest.id)
      .single();

    setIsSelecting(false);
    onSelect(data ?? guest);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault();
      handleSelect(results[activeIdx]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const handleBlur = () => setTimeout(() => setShowDropdown(false), 160);
  const handleFocus = () => { if (query.trim().length > 0) setShowDropdown(true); };

  const emptyMessage = loadError
    ? 'No pudimos cargar la lista. Por favor, recarga la página.'
    : status === 'need-surname'
      ? 'Escribe también tu apellido, por favor.'
      : 'No encontramos ese nombre. Revísalo tal como aparece en el sobre.';

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="text"
          className="input-elegant"
          placeholder="Escribe tu nombre y tu apellido..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          autoComplete="off"
          style={{ paddingLeft: '3rem', paddingRight: '1rem', textAlign: 'left' }}
        />
        <div style={{ position: 'absolute', left: '1rem', color: 'var(--clr-text-faint)' }}>
          {isLoading ? <Loader2 size={18} className="spin" /> : <Search size={18} strokeWidth={1.5} />}
        </div>
      </div>

      <AnimatePresence>
        {showDropdown && query.trim().length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--clr-white-pure)',
              border: '1px solid rgba(2, 47, 99, 0.05)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-md)',
              marginTop: '0.5rem',
              zIndex: 10,
              listStyle: 'none',
              overflow: 'hidden'
            }}
          >
            {results.length > 0 ? (
              results.map((guest, idx) => (
                <li
                  key={guest.id}
                  onMouseDown={() => handleSelect(guest)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  style={{
                    padding: '1rem 1.5rem',
                    cursor: 'pointer',
                    background: idx === activeIdx ? 'var(--clr-light-blue)' : 'transparent',
                    color: 'var(--clr-navy)',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    transition: 'background 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: idx < results.length - 1 ? '1px solid rgba(2, 47, 99, 0.05)' : 'none'
                  }}
                >
                  <span>
                    {guest.nombre} {guest.apellido}
                  </span>
                </li>
              ))
            ) : (
              !isLoading && (
                <li style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--clr-text-faint)', fontStyle: 'italic' }}>
                  {emptyMessage}
                </li>
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
