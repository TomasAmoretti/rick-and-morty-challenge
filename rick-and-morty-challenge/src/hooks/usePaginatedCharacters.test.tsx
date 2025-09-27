import { renderHook, waitFor } from "@testing-library/react";
import { usePaginatedCharacters } from "./usePaginatedCharacters";
import * as api from "../lib/rickAndMortyApiCall";

jest.mock("../lib/rickAndMortyApiCall");

describe("usePaginatedCharacters", () => {
  it("debería traer personajes de la API", async () => {
    (api.fetchCharacters as jest.Mock).mockResolvedValue({
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          image: "rick.png",
        },
        {
          id: 2,
          name: "Morty Smith",
          status: "Alive",
          species: "Human",
          image: "morty.png",
        },
      ],
    });

    const { result } = renderHook(() => usePaginatedCharacters(1));

    await waitFor(() => {
      expect(result.current.data?.results).toHaveLength(2);
      expect(result.current.data?.results[0].name).toBe("Rick Sanchez");
      expect(result.current.data?.results[1].name).toBe("Morty Smith");
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("debería manejar errores de la API", async () => {
    (api.fetchCharacters as jest.Mock).mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => usePaginatedCharacters(1));

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.data).toBeNull();
      expect(result.current.loading).toBe(false);
    });
  });
});
