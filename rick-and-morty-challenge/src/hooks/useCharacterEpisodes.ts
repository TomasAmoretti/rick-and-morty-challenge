import { useEffect, useState } from 'react';

type Episode = {
  id: number;
  name: string;
  episode: string;
  air_date: string;
};

export function useCharacterEpisodes(characterId: number | null) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!characterId) return;

    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
        const data = await res.json();

        // Episodios vienen como array de URLs -> pedimos todos en una sola llamada
        if (data.episode) {
          const episodeIds = data.episode.map((url: string) => url.split('/').pop());
          const epRes = await fetch(`https://rickandmortyapi.com/api/episode/${episodeIds.join(',')}`);
          const epData = await epRes.json();
          setEpisodes(Array.isArray(epData) ? epData : [epData]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [characterId]);

  return { episodes, loading };
}