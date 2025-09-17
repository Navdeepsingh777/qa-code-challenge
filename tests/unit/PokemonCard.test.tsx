import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import PokemonCard from "../../src/components/PokemonCard";

describe("PokemonCard Component", () => {
  it("renders Pokémon name", () => {
    render(<PokemonCard name="Bulbasaur" image="/bulbasaur.png" />);
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
  });

  it("renders Pokémon image", () => {
    render(<PokemonCard name="Bulbasaur" image="/bulbasaur.png" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/bulbasaur.png");
  });
});
