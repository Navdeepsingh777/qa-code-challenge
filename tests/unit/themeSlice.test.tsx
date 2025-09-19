import { describe, it, expect } from "vitest";
import settingsReducer, { setPageSize } from "../../src/features/settings/state/settingsSlice";

describe("settingsSlice", () => {
  it("should update page size", () => {
    const initialState = { 
      pageSize: 10, 
      density: "comfortable", 
      showFields: {}, 
      theme: "light" 
    };

    const newState = settingsReducer(initialState, setPageSize(20));
    expect(newState.pageSize).toBe(20);
  });
});
