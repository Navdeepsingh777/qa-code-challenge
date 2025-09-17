import type { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("http://localhost:5173", { waitUntil: "domcontentloaded" });
    // ✅ Wait for at least one Pokémon link
    await this.page.waitForSelector("a[href^='/pokemon/']", { timeout: 30000 });
  }

  async getFirstPokemonName(): Promise<string> {
    const firstLink = this.page.locator("a[href^='/pokemon/']").first();
    await firstLink.waitFor({ state: "visible" });
    return firstLink.innerText();
  }

  async clickNext() {
    const nextButton = this.page.getByRole("button", { name: "Next page" });
    await nextButton.waitFor({ state: "visible", timeout: 10000 });
    await nextButton.click();
  }

  async clickPrev() {
    const prevButton = this.page.getByRole("button", { name: "Previous page" });
    await prevButton.waitFor({ state: "visible", timeout: 10000 });
    await prevButton.click();
  }

  async clickFirstPokemon() {
    const firstLink = this.page.locator("a[href^='/pokemon/']").first();
    await firstLink.click();
  }
}
