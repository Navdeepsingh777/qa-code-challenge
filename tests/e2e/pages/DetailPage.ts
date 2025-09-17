import type { Page } from "@playwright/test";

export class DetailPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ✅ Wait for detail page to load (name + sprite)
  async waitForDetailLoaded() {
    await this.page.waitForSelector("h1", { timeout: 10000 }); // Pokémon name
    await this.page.waitForSelector("img", { timeout: 10000 }); // Pokémon sprite
  }

  // ✅ Pokémon name
  async getPokemonName(): Promise<string> {
    return this.page.locator("h1").innerText();
  }

  // ✅ Pokémon sprite
  async isSpriteVisible(): Promise<boolean> {
    return this.page.locator("img").isVisible();
  }

  // ✅ Capture visible section headers
  async getVisibleDetailSections(): Promise<string[]> {
    // Grab headers likely used for sections: h2 or strong elements
    const headers = this.page.locator("section h2, section strong, div h2, div strong");
    const count = await headers.count();
    const sections: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = (await headers.nth(i).innerText()).trim();
      if (text) {
        sections.push(text);
      }
    }

    return sections;
  }
}
