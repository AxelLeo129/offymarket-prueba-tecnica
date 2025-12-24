const EXTERNAL_URL = process.env.EXTERNAL_POSTS_URL || "https://687eade4efe65e5200875629.mockapi.io/api/v1/posts";

async function fetchExternalPosts() {
  const res = await fetch(EXTERNAL_URL);
  if (!res.ok) {
    throw new Error(`External API error: ${res.status}`);
  }
  return res.json();
}

function normalizeName(value) {
  return typeof value === "string" ? value.trim() : "";
}

function groupPostsByName(posts) {
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

async function getGroupedPosts({ nameFilter = "" } = {}) {
  const posts = await fetchExternalPosts();
  const grouped = groupPostsByName(Array.isArray(posts) ? posts : []);

  if (!nameFilter) return grouped;

  const nf = nameFilter.toLowerCase();
  return grouped.filter((x) => x.name.toLowerCase().includes(nf));
}

module.exports = {
  getGroupedPosts
};
