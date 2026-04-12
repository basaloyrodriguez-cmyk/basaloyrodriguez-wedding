import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, UserCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';

/**
 * GuestSearchInput
 * Live autocomplete against `invitados` table.
 * Calls onSelect(guestRow) when the user picks a result.
 */
export function GuestSearchInput({ onSelect, disabled = false }) {
  const [query, setQuery]               = useState('');
  const [results, setResults]           = useState([]);
  const [isLoading, setIsLoading]       = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIdx, setActiveIdx]       = useState(-1); // keyboard navigation
  const inputRef  = useRef(null);
  const listRef   = useRef(null);

  // ── Search effect with debounce ────────────────────────────────────────
  useEffect(() => {
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
        .limit(6);

      setResults(data ?? []);
      setShowDropdown(true);
      setActiveIdx(-1);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleSelect = (guest) => {
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

  const handleBlur = () => {
    // Delay so mousedown on list item fires first
    setTimeout(() => setShowDropdown(false), 160);
  };

  const handleFocus = () => {
    if (results.length > 0) setShowDropdown(true);
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="guest-search">
      {/* Input */}
      <div className="guest-search__field">
        <span className="guest-search__icon">
          {isLoading
            ? <Loader2 size={16} className="spin" />
            : <Search size={16} />
          }
        </span>
        <input
          ref={inputRef}
          type="text"
          className="input guest-search__input"
          placeholder="Escribe tu nombre o apellido…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); }}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          autoComplete="off"
          aria-label="Buscar invitado"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <ul
          ref={listRef}
          className="guest-search__dropdown"
          role="listbox"
        >
          {results.length > 0 ? (
            results.map((guest, idx) => (
              <li
                key={guest.id}
                role="option"
                aria-selected={idx === activeIdx}
                className={`guest-search__item ${idx === activeIdx ? 'guest-search__item--active' : ''}`}
                onMouseDown={() => handleSelect(guest)}
                onMouseEnter={() => setActiveIdx(idx)}
              >
                <span className="guest-search__item-icon">
                  <UserCheck size={14} />
                </span>
                <span className="guest-search__item-body">
                  <span className="guest-search__item-name">
                    {highlight(guest.nombre, query)} {highlight(guest.apellido, query)}
                  </span>
                  {guest.correo && (
                    <span className="guest-search__item-email">{guest.correo}</span>
                  )}
                </span>
                {guest.asistira !== null && (
                  <span className={`guest-search__item-badge ${guest.asistira ? 'badge--confirmed' : 'badge--declined'}`}>
                    {guest.asistira ? 'Confirmado' : 'No asiste'}
                  </span>
                )}
              </li>
            ))
          ) : (
            !isLoading && (
              <li className="guest-search__empty">
                No encontramos ese nombre en la lista.
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

/** Wrap matched text portions in a <mark> for highlighting */
function highlight(text, query) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${escapeRegex(query.trim())})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part)
      ? <mark key={i} className="guest-search__highlight">{part}</mark>
      : part
  );
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
