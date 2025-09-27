import { renderHook, waitFor } from "@testing-library/react";
import { useCharacterEpisodes } from "./useCharacterEpisodes";

describe("useCharacterEpisodes", () => {
  beforeEach(() => {
    (globalThis.fetch as jest.Mock) = jest.fn((url: string) => {
      if (url.includes("character")) {
        // Primer fetch: personaje con 2 episodios
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              id: 1,
              name: "Rick Sanchez",
              episode: [
                "https://rickandmortyapi.com/api/episode/1",
                "https://rickandmortyapi.com/api/episode/2",
              ],
            }),
        }) as unknown as Promise<Response>;
      }

      if (url.includes("episode/1,2")) {
        // Segundo fetch: varios episodios juntos → devolver array
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                id: 1,
                name: "Pilot",
                episode: "S01E01",
                air_date: "December 2, 2013",
              },
              {
                id: 2,
                name: "Lawnmower Dog",
                episode: "S01E02",
                air_date: "December 9, 2013",
              },
            ]),
        }) as unknown as Promise<Response>;
      }

      return Promise.reject("URL inesperada: " + url);
    }) as jest.Mock;
  });

  it("debería devolver episodios del personaje", async () => {
    const { result } = renderHook(() => useCharacterEpisodes(1));

    await waitFor(() => {
      expect(result.current.episodes).toHaveLength(2);

      expect(result.current.episodes[0].name).toBe("Pilot");
      expect(result.current.episodes[0].episode).toBe("S01E01");
      expect(result.current.episodes[0].air_date).toBe("December 2, 2013");

      expect(result.current.episodes[1].name).toBe("Lawnmower Dog");
      expect(result.current.episodes[1].episode).toBe("S01E02");
      expect(result.current.episodes[1].air_date).toBe("December 9, 2013");
    });
  });
});
