import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PokemonList from "../../src/features/pokemon/components/List/PokemonList";

describe("PokemonList Component", () => {
  it("renders a Pokémon name as a link", () => {
    const mockItems = [{ name: "pikachu", url: "/pokemon/pikachu" }];
    render(
      <MemoryRouter>
        <PokemonList items={mockItems} />
      </MemoryRouter>
    );
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
  });
});
