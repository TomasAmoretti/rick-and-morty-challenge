import { useState } from 'react';
import { usePaginatedCharacters } from '../hooks/usePaginateddCharacters';
import CharacterCard from '../components/CharacterCard';

export default function Home() {
  const [page1] = useState(1);
  const [page2] = useState(1);

  const { data: data1, loading: loading1 } = usePaginatedCharacters(page1);
  const { data: data2, loading: loading2 } = usePaginatedCharacters(page2);

  return (
    <main>
      <section>
        <h2>Character #1</h2>
        {loading1 && <p>Cargando...</p>}
        <div className="grid">
          {data1?.results?.map((c) => (
            <CharacterCard
              key={c.id}
              id={c.id}
              name={c.name}
              image={c.image}
              status={c.status}
              species={c.species}
            />
          ))}
        </div>
      </section>

      <section>
        <h2>Character #2</h2>
        {loading2 && <p>Cargando...</p>}
        <div className="grid">
          {data2?.results?.map((c) => (
            <CharacterCard
              key={c.id}
              id={c.id}
              name={c.name}
              image={c.image}
              status={c.status}
              species={c.species}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
