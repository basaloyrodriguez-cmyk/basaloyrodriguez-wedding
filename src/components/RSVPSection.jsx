import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const STEP = {
  PROMPT: 'prompt',
  FORM: 'form',
  SUCCESS: 'success',
};

export function RSVPSection({ guest, companions }) {
  const [step, setStep] = useState(STEP.PROMPT);
  const [attending, setAttending] = useState(null);
  const [selectedCompanions, setSelectedCompanions] = useState(() => 
    companions.filter(c => c.asistira === true).map(c => c.id)
  );
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const firstName = guest.nombre.split(' ')[0];
  const hasCompanions = companions.length > 0;
  const needsEmail = !guest.correo;
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

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

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#022f63', '#445a43', '#e6f2f7', '#b0c074']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#022f63', '#445a43', '#e6f2f7', '#b0c074']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleSubmit = async () => {
    if (attending && needsEmail && !isValidEmail(email)) {
      setError('Por favor, escribe un correo electrónico válido para poder enviarte la confirmación.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const correoNuevo = attending && needsEmail ? email.trim() : null;

    try {
      const { error: guestError } = await supabase
        .from('invitados')
        .update({
          asistira: attending,
          ...(correoNuevo ? { correo: correoNuevo } : {}),
          updated_at: new Date().toISOString(),
        })
        .eq('id', guest.id);

      if (guestError) throw guestError;

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

      if (attending) {
        const attendeesToEmail = [];
        const guestCorreo = guest.correo || correoNuevo;

        if (guestCorreo) {
          attendeesToEmail.push({ id: guest.id, nombre: guest.nombre.split(' ')[0], correo: guestCorreo });
        }

        if (hasCompanions) {
          companions.forEach(c => {
            if (selectedCompanions.includes(c.id) && c.correo) {
              attendeesToEmail.push({ id: c.id, nombre: c.nombre.split(' ')[0], correo: c.correo });
            }
          });
        }

        const emailPromises = attendeesToEmail.map(person => 
          supabase.functions.invoke('wedding-email', {
            body: { guestEmail: person.correo, firstName: person.nombre, guestId: person.id }
          }).catch(err => console.error('Error invoking wedding-email:', err))
        );

        await Promise.all(emailPromises);
        
        // Trigger confetti ONLY if attending
        triggerConfetti();
      }

      setStep(STEP.SUCCESS);
    } catch (err) {
      console.error('Error RSVP:', err);
      setError('Hubo un problema al enviar tu confirmación. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="rsvp-section" style={{ padding: '4rem 0', display: 'flex', justifyContent: 'center' }}>
      <div className="panel" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          
          {step === STEP.PROMPT && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="section-title" style={{ marginBottom: '1rem' }}>RSVP</h3>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--clr-navy)', marginBottom: '3rem', lineHeight: 1.2 }}>
                Hola {firstName},<br />
                <span className="script-accent" style={{ fontSize: '2.5rem', display: 'inline-block', marginTop: '1rem' }}>
                  ¿Nos acompañarás en este día tan especial?
                </span>
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="btn btn--primary" style={{ width: '100%', height: '4rem', fontSize: '1rem' }} onClick={() => handleChoice(true)}>
                  Sí asistiré
                </button>
                <button className="btn btn--secondary" style={{ width: '100%', height: '4rem', fontSize: '1rem' }} onClick={() => handleChoice(false)}>
                  No podré asistir
                </button>
              </div>
            </motion.div>
          )}

          {step === STEP.FORM && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'left' }}
            >
              <button 
                onClick={() => setStep(STEP.PROMPT)}
                style={{ color: 'var(--clr-text-faint)', fontSize: '0.9rem', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                ← Volver
              </button>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--clr-navy)', marginBottom: '2rem', textAlign: 'center' }}>
                {attending ? 'Detalles de tu asistencia' : 'Lo sentimos mucho'}
              </h3>

              {attending && hasCompanions && (
                <div style={{ marginBottom: '3rem' }}>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    ¿Quiénes te acompañan?
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {companions.map((c) => {
                      const isChecked = selectedCompanions.includes(c.id);
                      return (
                        <div 
                          key={c.id} 
                          onClick={() => toggleCompanion(c.id)}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            padding: '1rem 1.5rem',
                            border: `1px solid ${isChecked ? 'var(--clr-navy)' : 'rgba(2, 47, 99, 0.1)'}`,
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            background: isChecked ? 'var(--clr-light-blue)' : 'transparent'
                          }}
                        >
                          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--clr-navy)' }}>
                            {c.nombre} {c.apellido}
                          </span>
                          
                          {/* Elegant Switch */}
                          <div style={{
                            width: '44px',
                            height: '24px',
                            borderRadius: '12px',
                            background: isChecked ? 'var(--clr-navy)' : 'rgba(2, 47, 99, 0.1)',
                            position: 'relative',
                            transition: 'background 0.3s ease'
                          }}>
                            <motion.div
                              layout
                              transition={{ type: "spring", stiffness: 700, damping: 30 }}
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: 'var(--clr-white-pure)',
                                position: 'absolute',
                                top: '2px',
                                left: isChecked ? '22px' : '2px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {attending && needsEmail && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Tu correo electrónico
                  </p>
                  <p style={{ color: 'var(--clr-text-faint)', fontSize: '0.8rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                    Lo necesitamos para enviarte la confirmación.
                  </p>
                  <input
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid rgba(2, 47, 99, 0.2)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.1rem',
                      color: 'var(--clr-navy)',
                      outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Déjanos un mensaje (Opcional)
                </p>
                <textarea
                  rows={3}
                  placeholder={attending ? '¡Qué emoción celebrar con ustedes!' : 'Les mando mis mejores deseos...'}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '1px solid rgba(2, 47, 99, 0.2)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    color: 'var(--clr-navy)',
                    outline: 'none',
                    resize: 'none',
                    background: 'transparent'
                  }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {error && <p style={{ color: 'var(--clr-error)', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</p>}

              <button
                className="btn btn--primary"
                style={{ width: '100%' }}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 size={16} className="spin mr-2" />Enviando…</>
                ) : (
                  'Confirmar Respuesta'
                )}
              </button>
            </motion.div>
          )}

          {step === STEP.SUCCESS && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <h3 className="script-accent" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                ¡Gracias!
              </h3>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--clr-navy)', marginBottom: '2rem' }}>
                {attending 
                  ? 'Tu asistencia ha sido registrada.' 
                  : 'Entendemos y te llevaremos en el corazón.'}
              </p>
              {message && (
                <div style={{ padding: '2rem', borderTop: '1px solid rgba(2, 47, 99, 0.1)', borderBottom: '1px solid rgba(2, 47, 99, 0.1)' }}>
                  <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.8rem', color: 'var(--clr-olive)' }}>"{message}"</p>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
