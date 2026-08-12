/**
 * Búsqueda de invitados en el navegador.
 *
 * Regla central: coincidencia EXACTA, normalizada (sin tildes, mayúsculas,
 * puntuación o espacios extra) — nunca una lista de candidatos parecidos.
 * El invitado escribe su nombre y apellido, y solo hay dos resultados
 * posibles: lo encontramos o no lo encontramos.
 *
 * Módulo puro: no importa React ni Supabase.
 */

/** Partículas de apellidos compuestos ("Ana de la Cruz"): no cuentan como palabra propia. */
const PARTICLES = new Set(['de', 'del', 'la', 'las', 'los', 'el', 'y', 'da', 'di', 'van', 'von']);

/** Marcas diacríticas combinantes que deja sueltas normalize('NFD'). */
const COMBINING_MARKS = /[̀-ͯ]/g;

/**
 * Minúsculas, sin tildes y sin puntuación.
 * NFD descompone la ñ en "n" + tilde combinante, así que "Nuñez" y "Nunez"
 * acaban siendo la misma cadena.
 */
export function normalize(str) {
  return (str ?? '')
    .toString()
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Primera palabra normalizada de una cadena, ignorando partículas ("de", "la", ...). */
function firstMeaningfulToken(str) {
  const tokens = normalize(str).split(' ').filter((t) => t && !PARTICLES.has(t));
  return tokens[0] ?? '';
}

/**
 * Precalcula, por invitado, las dos formas normalizadas contra las que se
 * compara: el nombre completo guardado, y "primer nombre + primer apellido".
 */
export function buildIndex(rows) {
  return (rows ?? []).map((row) => ({
    ...row,
    _fullKey: normalize(`${row.nombre} ${row.apellido}`),
    _shortKey: `${firstMeaningfulToken(row.nombre)} ${firstMeaningfulToken(row.apellido)}`.trim(),
  }));
}

/**
 * Coincidencia EXACTA (normalizada), sin tolerancia a erratas y sin lista de
 * candidatos. Devuelve el invitado o null.
 */
export function findExactGuest(index, query) {
  const q = normalize(query);
  if (!q) return null;
  return index.find((g) => q === g._fullKey || (g._shortKey && q === g._shortKey)) ?? null;
}
