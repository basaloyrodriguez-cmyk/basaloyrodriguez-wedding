/**
 * Búsqueda de invitados en el navegador.
 *
 * Regla central: para que un invitado aparezca en el desplegable, el texto
 * escrito debe identificar a la vez UN nombre y UN apellido suyos. Así
 * "juan basalo" encuentra a "Juan Manuel Basalo Villar", pero "maria" a solas
 * no lista a nadie.
 *
 * Módulo puro: no importa React ni Supabase.
 */

/** Partículas de apellidos compuestos ("Ana de la Cruz"): ni cuentan ni estorban. */
const PARTICLES = new Set(['de', 'del', 'la', 'las', 'los', 'el', 'y', 'da', 'di', 'van', 'von']);

/** Longitud mínima de una palabra para perdonarle una errata. */
const TYPO_MIN_LENGTH = 4;

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

/** Palabras normalizadas, sin partículas. */
export function tokenize(str) {
  const clean = normalize(str);
  if (!clean) return [];
  return clean.split(' ').filter((t) => t && !PARTICLES.has(t));
}

/**
 * Distancia de edición entre `q` y el MEJOR prefijo de `target`.
 * "basal" → 0 contra "basalo" (prefijo exacto), y que el nombre guardado sea
 * más largo no penaliza.
 *
 * Es Damerau-Levenshtein (variante OSA): además de insertar, borrar y
 * sustituir, intercambiar dos letras contiguas cuesta 1. Sin eso "Baslao"
 * estaría a distancia 2 de "Basalo", y bailarse dos letras seguidas es
 * justamente la errata más habitual al escribir deprisa en el móvil.
 */
export function prefixEditDistance(q, target) {
  const n = q.length;
  if (!n) return 0;
  // Con un máximo de 1 edición, prefijos más largos que n + 1 no ayudan.
  const maxJ = Math.min(target.length, n + 1);
  if (maxJ < n - 1) return n - target.length;

  let two = new Array(n + 1); // fila j-2
  let one = new Array(n + 1); // fila j-1
  let cur = new Array(n + 1);
  for (let i = 0; i <= n; i++) one[i] = i;
  let best = one[n];

  for (let j = 1; j <= maxJ; j++) {
    cur[0] = j;
    for (let i = 1; i <= n; i++) {
      const cost = q[i - 1] === target[j - 1] ? 0 : 1;
      let v = Math.min(one[i] + 1, cur[i - 1] + 1, one[i - 1] + cost);
      if (i > 1 && j > 1 && q[i - 1] === target[j - 2] && q[i - 2] === target[j - 1]) {
        v = Math.min(v, two[i - 2] + 1);
      }
      cur[i] = v;
    }
    if (cur[n] < best) best = cur[n];
    const recycled = two;
    two = one;
    one = cur;
    cur = recycled;
  }

  return best;
}

/**
 * ¿Casa la palabra escrita con la palabra del invitado?
 * Devuelve null si no, o una puntuación: 0 = prefijo limpio, 1 = con errata.
 * El mínimo de 4 caracteres para tolerar erratas es importante: sin él "jua"
 * casaría con medio listado.
 */
export function tokenMatches(qTok, gTok) {
  if (!qTok || !gTok) return null;
  if (gTok.startsWith(qTok)) return 0;
  if (qTok.length >= TYPO_MIN_LENGTH && prefixEditDistance(qTok, gTok) <= 1) return 1;
  return null;
}

/** Mejor puntuación de `qTok` contra una lista de palabras, o null si no casa con ninguna. */
function bestScore(qTok, gTokens) {
  let best = null;
  for (const gTok of gTokens) {
    const score = tokenMatches(qTok, gTok);
    if (score !== null && (best === null || score < best)) best = score;
  }
  return best;
}

/**
 * Precalcula las palabras normalizadas de cada invitado una sola vez,
 * para no re-normalizar la lista entera en cada pulsación.
 */
export function buildIndex(rows) {
  return (rows ?? []).map((row) => ({
    ...row,
    nomTokens: tokenize(row.nombre),
    apeTokens: tokenize(row.apellido)
  }));
}

/**
 * @param {Array} index  salida de buildIndex()
 * @param {string} query texto escrito por el invitado
 * @returns {{ status: 'need-surname' | 'not-found' | 'ok', results: Array }}
 */
export function searchGuests(index, query, limit = 5) {
  const qTokens = tokenize(query);

  // Con una sola palabra no se lista a nadie: es lo que evita que escribir "M"
  // deje ver la lista de invitados.
  if (qTokens.length < 2) return { status: 'need-surname', results: [] };

  const matches = [];

  for (const guest of index) {
    let score = 0;
    let allMatched = true;
    const nameHits = [];    // índices de palabras que casan con el nombre
    const surnameHits = []; // índices de palabras que casan con el apellido

    for (let i = 0; i < qTokens.length; i++) {
      const nomScore = bestScore(qTokens[i], guest.nomTokens);
      const apeScore = bestScore(qTokens[i], guest.apeTokens);

      // Toda palabra escrita tiene que casar con algo: "juan basalo pepito" no cuela.
      if (nomScore === null && apeScore === null) {
        allMatched = false;
        break;
      }

      if (nomScore !== null) nameHits.push(i);
      if (apeScore !== null) surnameHits.push(i);
      score += Math.min(nomScore ?? Infinity, apeScore ?? Infinity);
    }

    if (!allMatched || nameHits.length === 0 || surnameHits.length === 0) continue;

    // El nombre y el apellido tienen que venir de palabras DISTINTAS. Solo falla
    // cuando una única palabra es la que casa con ambas columnas y no hay otra
    // que cubra el otro lado (p. ej. "Basalo Basalo" escribiendo solo "basalo").
    const sameSingleToken =
      nameHits.length === 1 && surnameHits.length === 1 && nameHits[0] === surnameHits[0];
    if (sameSingleToken) continue;

    // Desempate: primar a quien casó por su PRIMER nombre y su PRIMER apellido.
    const hitsFirstName = qTokens.some((t) => tokenMatches(t, guest.nomTokens[0] ?? '') !== null);
    const hitsFirstSurname = qTokens.some((t) => tokenMatches(t, guest.apeTokens[0] ?? '') !== null);
    const primaryPenalty = (hitsFirstName ? 0 : 1) + (hitsFirstSurname ? 0 : 1);

    matches.push({ guest, score, primaryPenalty });
  }

  matches.sort(
    (a, b) =>
      a.score - b.score ||
      a.primaryPenalty - b.primaryPenalty ||
      (a.guest.apellido ?? '').localeCompare(b.guest.apellido ?? '', 'es')
  );

  const results = matches.slice(0, limit).map((m) => m.guest);
  return { status: results.length > 0 ? 'ok' : 'not-found', results };
}
