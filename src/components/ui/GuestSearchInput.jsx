import { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export function GuestSearchInput({ onSelect, disabled = false }) {
  const [query, setQuery]               = useState('');
  const [results, setResults]           = useState([]);
  const [isLoading, setIsLoading]       = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIdx, setActiveIdx]       = useState(-1);
  const inputRef  = useRef(null);
  const skipNextSearch = useRef(false);

  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return;
    }

    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('invitados')
        .select('id, nombre, apellido, correo, asistira')
        .or(`nombre.ilike.%${query.trim()}%,apellido.ilike.%${query.trim()}%`)
        .order('apellido', { ascending: true })
        .limit(5);

      setResults(data ?? []);
      setShowDropdown(true);
      setActiveIdx(-1);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (guest) => {
    skipNextSearch.current = true;
    setQuery(`${guest.nombre} ${guest.apellido}`);
    setShowDropdown(false);
    setResults([]);
    onSelect(guest);
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
  const handleFocus = () => { if (results.length > 0) setShowDropdown(true); };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="text"
          className="input-elegant"
          placeholder="Escribe tu nombre y apellido..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
        {showDropdown && (
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
                  No encontramos ese nombre. Intenta escribir solo tu primer nombre.
                </li>
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
