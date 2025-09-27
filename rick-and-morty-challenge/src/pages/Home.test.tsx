import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";

/**
 * Mockeamos los hooks que consume Home para que:
 * - usePaginatedCharacters retorne data de forma sincrónica (sin loading)
 * - useCharacterEpisodes retorne arrays estables para calcular exclusivos/compartidos
 */

jest.mock("../hooks/usePaginatedCharacters", () => {
  const list = {
    results: [
      { id: 1, name: "Rick", status: "Alive", species: "Human", image: "rick.png" },
      { id: 2, name: "Morty", status: "Alive", species: "Human", image: "morty.png" },
    ],
  };
  return {
    usePaginatedCharacters: () => ({
      data: list,
      loading: false,
      error: null,
    }),
  };
});

jest.mock("../hooks/useCharacterEpisodes", () => {
  // Para que haya exclusivos y compartidos:
  // - Rick (#1) aparece en ep 1 y 2
  // - Morty (#2) aparece en ep 2 y 3
  // Compartidos => ep id=2
  const EP1 = { id: 1, name: "Pilot",         episode: "S01E01", air_date: "December 2, 2013" };
  const EP2 = { id: 2, name: "Lawnmower Dog", episode: "S01E02", air_date: "December 9, 2013" };
  const EP3 = { id: 3, name: "Anatomy Park",  episode: "S01E03", air_date: "December 16, 2013" };

  return {
    useCharacterEpisodes: (id: number | null) => {
      if (id === 1) return { episodes: [EP1, EP2], loading: false }; // Rick
      if (id === 2) return { episodes: [EP2, EP3], loading: false }; // Morty
      return { episodes: [], loading: false };
    },
  };
});

describe("Home Page", () => {
  it("renderiza personajes", () => {
    render(<Home />);
    expect(screen.getAllByAltText("Rick")).toHaveLength(2);
    expect(screen.getAllByAltText("Morty")).toHaveLength(2);
  });

  it("no muestra episodios si solo un personaje está seleccionado", () => {
    render(<Home />);

    // Click en Rick de la columna Character #1
    fireEvent.click(screen.getAllByText("Rick")[0]);

    expect(
      screen.queryByRole("heading", { name: /Character #1 - Only Episodes/ })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /Character #2 - Only Episodes/ })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /Character #1 & Character #2 - Shared Episodes/,
      })
    ).not.toBeInTheDocument();
  });

  it("muestra episodios compartidos y exclusivos cuando ambos personajes están seleccionados", () => {
    render(<Home />);

    // Seleccionamos Rick de Character #1 y Morty de Character #2
    fireEvent.click(screen.getAllByText("Rick")[0]);  // columna izquierda
    fireEvent.click(screen.getAllByText("Morty")[1]); // columna derecha

    expect(
      screen.getByRole("heading", { name: /Character #1 - Only Episodes/ })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Character #2 - Only Episodes/ })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /Character #1 & Character #2 - Shared Episodes/,
      })
    ).toBeInTheDocument();

    // Validar que el compartido (S01E02) aparece en la lista del medio
    expect(screen.getAllByText(/S01E02 - Lawnmower Dog - December 9, 2013/).length).toBeGreaterThan(0);
  });
});
