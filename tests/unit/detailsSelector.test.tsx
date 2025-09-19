import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import settingsReducer, { setShowFields } from "../../src/features/settings/state/settingsSlice";
import { DetailsSelector } from "../../src/features/settings/components/DetailsSelector";

function renderWithStore(ui: React.ReactNode, preloadedState?: any) {
  const store = configureStore({
    reducer: { settings: settingsReducer },
    preloadedState,
  });
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("DetailsSelector Component", () => {
  it("renders checkboxes for active fields", () => {
    const preloadedState = {
      settings: {
        pageSize: 10,
        density: "comfortable",
        theme: "light",
        showFields: { name: true, type: false, abilities: true },
      },
    };

    renderWithStore(<DetailsSelector />, preloadedState);

    // Check that name and abilities checkboxes are rendered
    expect(screen.getByLabelText("name")).toBeInTheDocument();
    expect(screen.getByLabelText("abilities")).toBeInTheDocument();
  });

  it("toggles a field when checkbox is clicked", () => {
    const preloadedState = {
      settings: {
        pageSize: 10,
        density: "comfortable",
        theme: "light",
        showFields: { name: true },
      },
    };

    renderWithStore(<DetailsSelector />, preloadedState);

    const checkbox = screen.getByLabelText("name") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
