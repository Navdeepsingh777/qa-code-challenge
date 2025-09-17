import { describe, it, expect } from "vitest";

// Example pagination utility
function getPageCount(totalItems: number, pageSize: number): number {
  if (pageSize <= 0) return 0;
  return Math.ceil(totalItems / pageSize);
}

describe("Pagination Utils", () => {
  it("returns correct page count", () => {
    expect(getPageCount(50, 10)).toBe(5);   // exact division
    expect(getPageCount(45, 10)).toBe(5);   // rounding up
    expect(getPageCount(0, 10)).toBe(0);    // no items
  });

  it("returns 0 when page size is invalid", () => {
    expect(getPageCount(10, 0)).toBe(0);
    expect(getPageCount(10, -5)).toBe(0);
  });
});

