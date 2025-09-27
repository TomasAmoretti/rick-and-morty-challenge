import { useState } from "react";

import { usePaginatedCharacters } from "../hooks/usePaginatedCharacters";
import { useCharacterEpisodes } from "../hooks/useCharacterEpisodes";

import CharacterCard from "../components/CharacterCard";
import CharacterCardSkeleton from "../components/CharacterCardSkeleton";

import styles from "./Home.module.scss";
import EpisodeSkeleton from "../components/EpisodeSkeleton";

export default function Home() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);

  // Personajes seleccionados
  const [character1Selected, setCharacter1Selected] = useState<number | null>(
    null
  );
  const [character2Selected, setCharacter2Selected] = useState<number | null>(
    null
  );

  // Obtener personajes paginados
  const { data: data1, loading: loading1 } = usePaginatedCharacters(page1);
  const { data: data2, loading: loading2 } = usePaginatedCharacters(page2);

  // Obtener episodios de los personajes seleccionados
  const { episodes: episodes1, loading: loadingEp1 } =
    useCharacterEpisodes(character1Selected);
  const { episodes: episodes2, loading: loadingEp2 } =
    useCharacterEpisodes(character2Selected);

  // Calcular episodios compartidos y exclusivos
  const sharedEpisodes = episodes1.filter((e1) =>
    episodes2.some((e2) => e2.id === e1.id)
  );
  const only1 = episodes1.filter(
    (e1) => !sharedEpisodes.some((s) => s.id === e1.id)
  );
  const only2 = episodes2.filter(
    (e2) => !sharedEpisodes.some((s) => s.id === e2.id)
  );

  return (
    <main className={styles.main}>
      <section className={styles.characterSection}>
        <div className={styles.characterContainer}>
          <h2 className={styles.title}>Character #1</h2>

          {loading1 ? (
            <div className={styles.grid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <CharacterCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {data1?.results?.map((c) => (
                <CharacterCard
                  key={c.id}
                  id={c.id}
                  name={c.name}
                  image={c.image}
                  status={c.status}
                  species={c.species}
                  selected={character1Selected === c.id}
                  onClick={() =>
                    setCharacter1Selected((prev) =>
                      prev === c.id ? null : c.id
                    )
                  }
                />
              ))}
            </div>
          )}

          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              disabled={loading1 || !data1?.info?.prev}
              onClick={() => setPage1((p) => Math.max(1, p - 1))}
            >
              ← Prev
            </button>
            <span className={styles.pageInfo}>Page {page1}</span>
            <button
              className={styles.pageBtn}
              disabled={loading1 || !data1?.info?.next}
              onClick={() => setPage1((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        </div>

        <div className={styles.characterContainer}>
          <h2 className={styles.title}>Character #2</h2>

          {loading2 ? (
            <div className={styles.grid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <CharacterCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {data2?.results?.map((c) => (
                <CharacterCard
                  key={c.id}
                  id={c.id}
                  name={c.name}
                  image={c.image}
                  status={c.status}
                  species={c.species}
                  selected={character2Selected === c.id}
                  onClick={() =>
                    setCharacter2Selected((prev) =>
                      prev === c.id ? null : c.id
                    )
                  }
                />
              ))}
            </div>
          )}

          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              disabled={loading2 || !data2?.info?.prev}
              onClick={() => setPage2((p) => Math.max(1, p - 1))}
            >
              ← Prev
            </button>
            <span className={styles.pageInfo}>Page {page2}</span>
            <button
              className={styles.pageBtn}
              disabled={loading2 || !data2?.info?.next}
              onClick={() => setPage2((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      <section
        className={`${styles.episodeSection} ${
          character1Selected && character2Selected
            ? styles.episodeSectionSelected
            : ""
        }`}
      >
        {character1Selected && character2Selected && (
          <>
            <div className={styles.episodeContainer}>
              <h2>Character #1 - Only Episodes</h2>
              {loadingEp1 ? (
                <ul>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>
                      <EpisodeSkeleton />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul>
                  {only1.map((ep) => (
                    <li key={ep.id}>
                      {ep.episode} - {ep.name} - {ep.air_date}
                    </li>
                  ))}
                  {only1.length === 0 && (
                    <li>No exclusive episodes for Character #1.</li>
                  )}
                </ul>
              )}
            </div>

            <div className={styles.episodeContainer}>
              <h2>Character #1 & Character #2 - Shared Episodes</h2>
              {loadingEp1 || loadingEp2 ? (
                <ul>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>
                      <EpisodeSkeleton />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul>
                  {sharedEpisodes.map((ep) => (
                    <li key={ep.id}>
                      {ep.episode} - {ep.name} - {ep.air_date}
                    </li>
                  ))}
                  {sharedEpisodes.length === 0 && <li>No shared episodes.</li>}
                </ul>
              )}
            </div>

            <div className={styles.episodeContainer}>
              <h2>Character #2 - Only Episodes</h2>
              {loadingEp2 ? (
                <ul>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>
                      <EpisodeSkeleton />
                    </li>
                  ))}
                </ul>
              ) : (
                <ul>
                  {only2.map((ep) => (
                    <li key={ep.id}>
                      {ep.episode} - {ep.name} - {ep.air_date}
                    </li>
                  ))}
                  {only2.length === 0 && (
                    <li>No exclusive episodes for Character #2.</li>
                  )}
                </ul>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
