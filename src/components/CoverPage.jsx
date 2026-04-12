import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { WEDDING_DATA } from '../constants/weddingData';
import { Button } from './ui/Button';
import { GuestSearchInput } from './ui/GuestSearchInput';

/**
 * CoverPage — Digital envelope.
 * Guest searches their name via autocomplete; on selection we fetch
 * their companions and call onEnter(guestRecord, companions[]).
 */
export function CoverPage({ onEnter }) {
  // selectedGuest is set when the user picks from the dropdown
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isOpening, setIsOpening]         = useState(false);
  const [error, setError]                 = useState('');

  // Called when user picks a result from GuestSearchInput
  const handleGuestSelect = (guest) => {
    setSelectedGuest(guest);
    setError('');
  };

  // Called when user clears the search field (dropdown closes, new query starts)
  const handleSearchClear = () => {
    setSelectedGuest(null);
    setError('');
  };

  // Open the invitation — fetch companions then call onEnter
  const handleOpen = async () => {
    if (!selectedGuest) return;
    setIsOpening(true);
    setError('');

    try {
      // Fetch companion IDs linked to this guest
      const { data: parentescos } = await supabase
        .from('parentesco_invitados')
        .select('invitado_acompanante_id')
        .eq('invitado_principal_id', selectedGuest.id);

      let companions = [];
      if (parentescos && parentescos.length > 0) {
        const ids = parentescos.map((p) => p.invitado_acompanante_id);
        const { data: companionData } = await supabase
          .from('invitados')
          .select('*')
          .in('id', ids);
        companions = companionData ?? [];
      }

      // Fetch special roles/messages
      let specialMessage = null;
      const { data: guestRoles } = await supabase
        .from('invitado_roles')
        .select('rol_id')
        .eq('invitado_id', selectedGuest.id);

      if (guestRoles && guestRoles.length > 0) {
        const { data: messages } = await supabase
          .from('mensajes_rol')
          .select('*')
          .in('rol_id', guestRoles.map((r) => r.rol_id));
        
        if (messages && messages.length > 0) {
          specialMessage = messages[0];
        }
      }

      onEnter(selectedGuest, companions, specialMessage);
    } catch (err) {
      console.error('Error abriendo invitación:', err);
      setError('Hubo un problema de conexión. Por favor intenta de nuevo.');
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <div className="cover-page">
      {/* Decorative blobs */}
      <div className="cover-blob cover-blob--top" />
      <div className="cover-blob cover-blob--bottom" />

      <div className="cover-card animate-fade-in">
        <Heart className="cover-heart" strokeWidth={1.5} />

        <p className="cover-eyebrow">Invitación de Boda</p>
        <h1 className="cover-title">{WEDDING_DATA.coupleDisplay}</h1>
        <p className="cover-date">{WEDDING_DATA.dateDisplay}</p>

        <p className="cover-hint">
          Escribe tu nombre para encontrar tu invitación.
        </p>

        <div className="cover-form">
          <GuestSearchInput
            onSelect={handleGuestSelect}
            onClear={handleSearchClear}
            disabled={isOpening}
          />

          {/* Selected guest confirmation chip */}
          {selectedGuest && (
            <div className="cover-selected animate-fade-in">
              <span className="cover-selected__dot" />
              <span className="cover-selected__name">
                {selectedGuest.nombre} {selectedGuest.apellido}
              </span>
            </div>
          )}

          {error && (
            <p className="cover-msg cover-msg--error">{error}</p>
          )}

          <Button
            variant="primary"
            className="btn--full btn--lg"
            onClick={handleOpen}
            disabled={!selectedGuest || isOpening}
          >
            {isOpening ? (
              <>
                <Loader2 size={18} className="spin mr-2" />
                Abriendo…
              </>
            ) : (
              'Abrir Invitación ✉'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
