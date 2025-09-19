import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ThemeSelector from "../../src/features/settings/components/ThemeSelector";

describe("ThemeSelector Component", () => {
  it("renders Light and Dark options", () => {
    render(<ThemeSelector />);

    // Check for Light option
    expect(screen.getByRole("option", { name: "Light" })).toBeInTheDocument();

    // Check for Dark option
    expect(screen.getByRole("option", { name: "Dark" })).toBeInTheDocument();
  });

  it("renders a select element", () => {
    render(<ThemeSelector />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
