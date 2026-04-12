// ─── Wedding Configuration ─────────────────────────────────────────────────
// Edit this file to update all wedding information across the entire app.

import caletaImg  from '../assets/caleta.jpg';
import marriottImg from '../assets/marriott.jpg';

export const WEDDING_DATA = {
  groom: {
    firstName: 'Juan Manuel',
    lastName: 'Basalo Villar',
    shortName: 'Juan',
  },
  bride: {
    firstName: 'Maria Andrea',
    lastName: 'Rodriguez Molina',
    shortName: 'Andrea',
  },

  // Displayed as "Juan & Andrea" in headings
  coupleDisplay: 'Juan & Andrea',
  coupleFullDisplay: 'Juan Manuel & Maria Andrea',

  // ISO 8601 — used for the countdown timer
  dateTarget: new Date('2026-10-10T15:00:00'),
  dateDisplay: '10 de Octubre, 2026',

  tagline: '¡Nos Casamos!',

  message:
    'Tenemos el honor de invitarte a celebrar el comienzo de nuestra nueva vida juntos. Su presencia hará este día aún más especial.',

  ceremony: {
    time: '3:00 PM',
    place: 'Iglesia San Francisco de la Caleta',
    address: 'San Francisco, Ciudad de Panamá',
    mapsUrl: 'https://maps.google.com/?q=Iglesia+San+Francisco+de+la+Caleta+Panama',
    image: caletaImg,
  },

  reception: {
    time: '5:30 PM',
    place: 'Hotel JW Marriott',
    address: 'Piso 66 · Ciudad de Panamá',
    mapsUrl: 'https://maps.google.com/?q=JW+Marriott+Panama',
    image: marriottImg,
  },

  // Hero background photo (Unsplash — swap to own photo later)
  heroBgUrl:
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000',

  // Contact email shown when guest is not found in DB
  contactEmail: 'boda@basaloyrodriguez.com',
};
