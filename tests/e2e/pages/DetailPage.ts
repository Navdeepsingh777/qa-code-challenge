import type { Page } from "@playwright/test";

export class DetailPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ✅ Wait just for navigation (no hard failure on missing sections)
  async waitForDetailLoaded(options = { timeout: 15000 }) {
    await this.page.waitForURL("**/pokemon/*", { timeout: options.timeout });
  }

  // ✅ Capture visible section headers
  async getVisibleDetailSections(): Promise<string[]> {
    const headers = this.page.locator(
      "section h2, section strong, div h2, div strong, .detail-section h2, .detail-section strong"
    );
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

  // ✅ Logical validation (instead of raw timeout)
  async validateSections(expectedMissing: string[], expectedPresent: string[], attach: (msg: string, type: string) => void) {
    const sections = await this.getVisibleDetailSections();
    const normalized = sections.map(s => s.toLowerCase());
    const actual = normalized.join(" ");

    // Attach actual output for debugging
    attach(`🔎 Actual sections found:\n${actual}`, "text/plain");

    // Check missing ones
    for (const missing of expectedMissing) {
      if (actual.includes(missing.toLowerCase())) {
        attach(`❌ Expected NOT to see: ${missing}`, "text/plain");
        throw new Error(`Unexpected section found: ${missing}`);
      }
    }

    // Check present ones
    for (const present of expectedPresent) {
      if (!actual.includes(present.toLowerCase())) {
        attach(`❌ Expected to see: ${present}`, "text/plain");
        throw new Error(`Missing expected section: ${present}`);
      }
    }
  }
}
