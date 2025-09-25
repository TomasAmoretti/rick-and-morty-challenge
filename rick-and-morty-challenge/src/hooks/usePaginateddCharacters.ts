import { useEffect, useState } from 'react';
import { fetchCharacters } from '../lib/rickAndMortyApiCall';
import type { CharactersResponse } from '../types/rickAndMorty';

export function usePaginatedCharacters(page: number) {
  const [data, setData] = useState<CharactersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchCharacters(page)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [page]);

  return { data, loading, error };
}
