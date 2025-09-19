import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../../src/features/settings/state/settingsSlice";
import PageSizeInput from "../../src/features/settings/components/PageSizeInput";

function renderWithStore(ui: React.ReactNode) {
  const store = configureStore({ reducer: { settings: settingsReducer } });
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("PageSizeInput", () => {
  it("updates when user enters valid number", () => {
    renderWithStore(<PageSizeInput />);
    const input = screen.getByLabelText(/Page size/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "15" } });
    expect(input.value).toBe("15");
  });
});
