import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "./CharacterCard";

describe("CharacterCard", () => {
  const props = {
    id: 1,
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    status: "Alive",
    species: "Human",
    onClick: jest.fn(),
  };

  it("debería renderizar nombre, especie y status", () => {
    render(<CharacterCard {...props} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Alive - Human")).toBeInTheDocument();
  });

  it("debería mostrar la imagen con el alt correcto", () => {
    render(<CharacterCard {...props} />);
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toContain(props.image);
    expect(img.alt).toBe("Rick Sanchez");
  });

  it("debería llamar a onClick al hacer click", () => {
    render(<CharacterCard {...props} />);
    fireEvent.click(screen.getByText("Rick Sanchez"));
    expect(props.onClick).toHaveBeenCalled();
  });

  it("debería aplicar la clase 'selected' cuando selected=true", () => {
    const { container } = render(<CharacterCard {...props} selected />);
    expect(container.firstChild).toHaveClass("selected");
  });
});
