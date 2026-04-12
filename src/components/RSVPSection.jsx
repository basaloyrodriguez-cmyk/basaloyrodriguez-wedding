import { useState } from 'react';
import {
  Mail, CheckCircle2, XCircle, Users,
  MessageSquare, Loader2, Heart,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

// RSVP steps
const STEP = {
  PROMPT: 'prompt',       // Initial yes/no question
  FORM: 'form',           // Details form (attending or declining)
  SUCCESS: 'success',     // Submitted confirmation
};

/**
 * RSVPSection
 * @param {Object} guest        - Row from `invitados` table
 * @param {Array}  companions   - Rows from `invitados` for linked companions
 */
export function RSVPSection({ guest, companions }) {
  const [step, setStep] = useState(STEP.PROMPT);
  const [attending, setAttending] = useState(null); // true | false
  const [selectedCompanions, setSelectedCompanions] = useState([]); // ids of companions also attending
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const firstName = guest.nombre.split(' ')[0];
  const hasCompanions = companions.length > 0;

  // ─── Handlers ────────────────────────────────────────────────────────────

  const handleChoice = (choice) => {
    setAttending(choice);
    setStep(STEP.FORM);
    setError('');
  };

  const toggleCompanion = (id) => {
    setSelectedCompanions((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      // 1. Update the primary guest's attendance
      const { error: guestError } = await supabase
        .from('invitados')
        .update({
          asistira: attending,
          updated_at: new Date().toISOString(),
        })
        .eq('id', guest.id);

      if (guestError) throw guestError;

      // 2. Update companions: attending ones = true, rest = false (if they were pre-listed)
      if (hasCompanions && attending) {
        const updates = companions.map((companion) =>
          supabase
            .from('invitados')
            .update({
              asistira: selectedCompanions.includes(companion.id),
              updated_at: new Date().toISOString(),
            })
            .eq('id', companion.id)
        );
        await Promise.all(updates);
      }

      setStep(STEP.SUCCESS);
    } catch (err) {
      console.error('Error enviando RSVP:', err);
      setError('Hubo un problema al enviar tu confirmación. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  if (step === STEP.SUCCESS) {
    return (
      <Card id="rsvp-section" className="rsvp-card animate-fade-in">
        <div className="rsvp-success">
          <div className="rsvp-success-icon">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="rsvp-success-title">
            {attending ? '¡Qué emoción, nos vemos allá!' : 'Gracias por avisarnos'}
          </h3>
          <p className="rsvp-success-msg">
            {attending
              ? `¡Hemos registrado tu asistencia${selectedCompanions.length > 0 ? ` y la de tus acompañantes` : ''}, ${firstName}! No puedo esperar a celebrar juntos. 🎉`
              : `Lo sentimos mucho, ${firstName}. ¡Los tendremos en mente ese día de todas formas! 💛`}
          </p>
          {message.trim() && (
            <div className="rsvp-success-quote">
              <p>"{message}"</p>
            </div>
          )}
        </div>
      </Card>
    );
  }

  if (step === STEP.FORM) {
    return (
      <Card id="rsvp-section" className="rsvp-card animate-slide-up">
        <button className="rsvp-back" onClick={() => setStep(STEP.PROMPT)}>
          ← Volver
        </button>

        <h3 className="section-title">
          {attending ? '¡Genial! Completa tu registro' : 'Lo sentimos mucho'}
        </h3>

        <div className="rsvp-form-body">
          {/* Companion selection — only when attending and companions exist */}
          {attending && hasCompanions && (
            <div className="rsvp-field">
              <label className="rsvp-label">
                <Users size={15} />
                ¿Quiénes de tu grupo también asistirán?
              </label>
              <p className="rsvp-field-hint">
                Puedes confirmar por toda tu mesa en un solo paso.
              </p>
              <div className="rsvp-companions">
                {companions.map((c) => {
                  const checked = selectedCompanions.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCompanion(c.id)}
                      className={`companion-chip ${checked ? 'companion-chip--active' : ''}`}
                    >
                      <span className="companion-check">{checked ? '✓' : '+'}</span>
                      {c.nombre} {c.apellido}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional message */}
          <div className="rsvp-field">
            <label className="rsvp-label">
              <MessageSquare size={15} />
              Déjanos un mensaje <span className="rsvp-optional">(Opcional)</span>
            </label>
            <textarea
              rows={3}
              placeholder={
                attending
                  ? '¡Estamos muy emocionados!'
                  : 'Les deseamos lo mejor en este día tan especial…'
              }
              className="input rsvp-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {error && <p className="rsvp-error">{error}</p>}

          <Button
            variant="primary"
            className="btn--full btn--lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="spin mr-2" />
                Enviando…
              </>
            ) : (
              'Confirmar Respuesta'
            )}
          </Button>
        </div>
      </Card>
    );
  }

  // STEP.PROMPT — initial yes/no
  return (
    <Card id="rsvp-section" className="rsvp-card">
      <div className="rsvp-prompt">
        <Mail className="rsvp-prompt-icon" strokeWidth={1.5} />
        <h3 className="section-title">Confirmación de Asistencia</h3>
        <p className="rsvp-prompt-sub">
          Hola <strong>{guest.nombre}</strong>, ¿podrás acompañarnos?
        </p>

        <div className="rsvp-choices">
          <button className="rsvp-choice rsvp-choice--yes" onClick={() => handleChoice(true)}>
            <CheckCircle2 size={20} />
            Sí, asistiré
          </button>
          <button className="rsvp-choice rsvp-choice--no" onClick={() => handleChoice(false)}>
            <XCircle size={20} />
            No podré asistir
          </button>
        </div>
      </div>
    </Card>
  );
}
