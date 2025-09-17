/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/unit/setup.ts", // optional (for RTL)
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
