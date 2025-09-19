import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../../src/features/settings/state/settingsSlice";
import DensitySelector from "../../src/features/settings/components/DensitySelector";

function renderWithStore(ui: React.ReactNode) {
  const store = configureStore({ reducer: { settings: settingsReducer } });
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("DensitySelector Component", () => {
  it("renders Comfortable and Compact options", () => {
    renderWithStore(<DensitySelector />);
    expect(screen.getByRole("option", { name: "Comfortable" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Compact" })).toBeInTheDocument();
  });

  it("renders a select element", () => {
    renderWithStore(<DensitySelector />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
