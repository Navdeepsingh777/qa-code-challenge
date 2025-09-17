import type { Page } from "@playwright/test";

export class SettingsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo() {
    await this.page.click("text=Settings");
    await this.page.waitForURL("**/settings");
  }

  async changeTheme(theme: string) {
    await this.page.getByLabel("Theme").selectOption(theme);
  }

  async getSelectedTheme(): Promise<string> {
    return this.page.getByLabel("Theme").inputValue();
  }

  async isDarkModeActive(): Promise<boolean> {
    // Assumes app adds a "dark" class to <body> when dark mode is enabled
    const bodyClass = await this.page.locator("body").getAttribute("class");
    return bodyClass?.includes("dark") ?? false;
  }

  async changePageSize(size: number) {
    const input = this.page.locator("input[type='number']");
    await input.fill(size.toString());
  }

  async getPageSize(): Promise<number> {
    const input = this.page.locator("input[type='number']");
    return Number(await input.inputValue());
  }

  async uncheckFirstThreeDetailFields() {
    const checkboxes = this.page.locator("input[type='checkbox']");
    for (let i = 0; i < 3; i++) {
      const box = checkboxes.nth(i);
      if (await box.isChecked()) {
        await box.uncheck();
      }
    }
  }

  async getCheckedStates(): Promise<boolean[]> {
    const checkboxes = this.page.locator("input[type='checkbox']");
    const count = await checkboxes.count();
    const states: boolean[] = [];
    for (let i = 0; i < count; i++) {
      states.push(await checkboxes.nth(i).isChecked());
    }
    return states;
  }
}
