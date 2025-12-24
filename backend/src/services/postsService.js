/**
 * @file postsService.js
 * @description
 * Capa de servicios encargada de la lógica de negocio relacionada
 * con los posts.
 *
 * Responsabilidades:
 * - Consumir la API externa de posts.
 * - Normalizar y validar datos recibidos.
 * - Agrupar los posts por nombre.
 * - Aplicar filtros de búsqueda.
 *
 * Esta capa NO conoce Express ni la capa HTTP.
 */

const EXTERNAL_URL = process.env.EXTERNAL_POSTS_URL || "https://687eade4efe65e5200875629.mockapi.io/api/v1/posts";

/**
 * Obtiene los posts desde la API externa.
 *
 * @async
 * @function fetchExternalPosts
 * @throws {Error} Cuando la API externa responde con un error HTTP.
 * @returns {Promise<Array<Object>>} Lista de posts obtenida desde el servicio externo.
 */
const fetchExternalPosts = async () =>{
  const res = await fetch(EXTERNAL_URL);
  if (!res.ok) {
    throw new Error(`External API error: ${res.status}`);
  }
  return res.json();
}

/**
 * Normaliza el valor del nombre recibido.
 *
 * - Elimina espacios en blanco al inicio y final.
 * - Retorna una cadena vacía si el valor no es un string válido.
 *
 * @function normalizeName
 * @param {*} value Valor a normalizar.
 * @returns {string} Nombre normalizado.
 */
const normalizeName = (value) => {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Agrupa una lista de posts por el campo `name` y cuenta
 * cuántos posts existen por cada nombre.
 *
 * - Los registros con nombre vacío o inválido son ignorados.
 *
 * @function groupPostsByName
 * @param {Array<Object>} posts Lista de posts a procesar.
 * @returns {Array<{name: string, postCount: number}>}
 * Lista de objetos con el nombre y el total de posts.
 */
const groupPostsByName = (posts) => {
  const counts = new Map();

  for (const p of posts) {
    const name = normalizeName(p?.name);
    if (!name) continue;

    counts.set(name, (counts.get(name) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, postCount]) => ({ name, postCount }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Obtiene los posts agrupados por nombre y aplica un filtro opcional.
 *
 * Flujo:
 * 1. Consume la API externa.
 * 2. Agrupa los posts por nombre.
 * 3. Aplica filtro por nombre (si existe).
 *
 * @async
 * @function getGroupedPosts
 * @param {Object} [options]
 * @param {string} [options.nameFilter=""] Filtro opcional por nombre.
 * @returns {Promise<Array<{name: string, postCount: number}>>}
 * Lista de posts agrupados y filtrados.
 */
const getGroupedPosts = async ({ nameFilter = "" } = {}) => {
  const posts = await fetchExternalPosts();
  const grouped = groupPostsByName(Array.isArray(posts) ? posts : []);

  if (!nameFilter) return grouped;

  const nf = nameFilter.toLowerCase();
  return grouped.filter((x) => x.name.toLowerCase().includes(nf));
}

module.exports = {
  getGroupedPosts
};
