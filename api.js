const BASE_URL = 'https://swapi.online/api';

export async function searchCharacters(query) {
  const url = `${BASE_URL}/people/?search=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Falha ao buscar personagens');
  const data = await res.json();
  // swapi.online returns {count, next, previous, results}
  return data.results || [];
}

export async function getPeoplePage(page = 1) {
  const url = `${BASE_URL}/people/?page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Falha ao buscar personagens');
  const data = await res.json();
  return data.results || [];
}