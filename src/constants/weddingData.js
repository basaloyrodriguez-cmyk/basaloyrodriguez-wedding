// ─── Wedding Configuration ─────────────────────────────────────────────────
// Edit this file to update all wedding information across the entire app.

import caletaImg   from '../assets/caleta.png';
import marriottImg from '../assets/marriot_final.png';

export const WEDDING_DATA = {
  groom: {
    firstName: 'Juan Manuel',
    lastName: 'Basalo Villar',
    shortName: 'Juan',
  },
  bride: {
    firstName: 'Maria Andrea',
    lastName: 'Rodríguez Molina',
    shortName: 'Andrea',
  },

  // Displayed as "Juan & Andrea" in headings
  coupleDisplay: 'Juan & Andrea',
  coupleFullDisplay: 'Basalo & Rodríguez',

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

  // Accommodations data
  accommodations: [
    {
      id: 1,
      name: 'JW Marriott Panama',
      description: 'El lugar de nuestra recepción. Lujo y comodidad sin tener que salir del hotel tras la fiesta.',
      price: '$180 - $250 / noche',
      distance: '0 km (Lugar del evento)',
      link: 'https://www.marriott.com/en-us/hotels/ptyjw-jw-marriott-panama/overview/'
    },
    {
      id: 2,
      name: 'W Panama',
      description: 'Diseño moderno y vibrante en el distrito financiero de la ciudad.',
      price: '$140 - $190 / noche',
      distance: 'A 10 min en auto',
      link: 'https://www.marriott.com/en-us/hotels/ptywh-w-panama/overview/'
    },
    {
      id: 3,
      name: 'Sortis Hotel, Spa & Casino',
      description: 'Una experiencia completa con excelente gastronomía y relajación.',
      price: '$130 - $170 / noche',
      distance: 'A 12 min en auto',
      link: 'https://www.marriott.com/en-us/hotels/ptyak-sortis-hotel-spa-and-casino-autograph-collection/overview/'
    }
  ]
};
