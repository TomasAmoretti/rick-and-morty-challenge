const API_BASE = 'https://rickandmortyapi.com'; 
 
export async function fetchCharacters(page = 1) { 
  const res = await fetch(`${API_BASE}/api/character?page=${page}`); 
  if (!res.ok) throw new Error('No se pudo obtener personajes'); 
  return res.json(); 
} 
