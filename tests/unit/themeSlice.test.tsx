import { describe, it, expect } from "vitest";

// Fake slice reducer for testing
type ThemeState = "light" | "dark";

function toggleTheme(state: ThemeState): ThemeState {
  return state === "light" ? "dark" : "light";
}

describe("Theme Slice", () => {
  it("toggles from light → dark", () => {
    const newState = toggleTheme("light");
    expect(newState).toBe("dark");
  });

  it("toggles from dark → light", () => {
    const newState = toggleTheme("dark");
    expect(newState).toBe("light");
  });
});
