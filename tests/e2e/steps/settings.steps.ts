import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world.ts";
import { SettingsPage } from "../pages/SettingsPage.ts";
import { DetailPage } from "../pages/DetailPage.ts";

// ------------------------------
// Navigation
// ------------------------------
When("I navigate to Settings", async function (this: CustomWorld) {
  const settings = new SettingsPage(this.page);
  await settings.goTo();
});

When("I return to the home page", async function (this: CustomWorld) {
  await this.page.click("text=Home");
  await this.page.waitForURL("**/"); // wait for homepage load
  await this.page.waitForSelector("ul.list li.list-item a", { timeout: 10000 }); // ensure Pokémon cards exist
});

// ------------------------------
// Theme
// ------------------------------
When("I change the theme to {string}", async function (this: CustomWorld, theme: string) {
  const settings = new SettingsPage(this.page);
  await settings.changeTheme(theme);
});

Then("the theme should be set to {string}", async function (this: CustomWorld, theme: string) {
  const settings = new SettingsPage(this.page);
  const selected = await settings.getSelectedTheme();

  if (selected?.toLowerCase() !== theme.toLowerCase()) {
    this.attach(`❌ Theme mismatch\nExpected: ${theme}\nActual: ${selected}`, "text/plain");
  }

  expect(selected?.toLowerCase()).toBe(theme.toLowerCase());
});

// ------------------------------
// Page Size
// ------------------------------
When("I change the page size to {int}", async function (this: CustomWorld, size: number) {
  const settings = new SettingsPage(this.page);
  await settings.changePageSize(size);
});

Then("the page size should be set to {int}", async function (this: CustomWorld, size: number) {
  const settings = new SettingsPage(this.page);
  const value = await settings.getPageSize();

  if (value !== size) {
    this.attach(`❌ Page size mismatch\nExpected: ${size}\nActual: ${value}`, "text/plain");
  }

  expect(value).toBe(size);
});

Then("I should see exactly {int} Pokémon cards on the home page", async function (this: CustomWorld, expectedCount: number) {
  const cards = this.page.locator("ul.list li.list-item a");
  const actualCount = await cards.count();

  if (actualCount !== expectedCount) {
    this.attach(`❌ Card count mismatch\nExpected: ${expectedCount}\nActual: ${actualCount}`, "text/plain");
  }

  await expect(cards).toHaveCount(expectedCount, { timeout: 10000 });
});

// ------------------------------
// Detail Fields (Checkboxes)
// ------------------------------
When("I uncheck the first three detail fields", async function (this: CustomWorld) {
  const settings = new SettingsPage(this.page);
  await settings.uncheckFirstThreeDetailFields();
});

Then("the first three detail fields should not be selected", async function (this: CustomWorld) {
  const settings = new SettingsPage(this.page);
  const states = await settings.getCheckedStates();

  if (states[0] || states[1] || states[2]) {
    this.attach(
      `❌ Checkbox state mismatch\nExpected: all unchecked\nActual: ${JSON.stringify(states)}`,
      "text/plain"
    );
  }

  expect(states[0]).toBe(false);
  expect(states[1]).toBe(false);
  expect(states[2]).toBe(false);
});

// ------------------------------
// Click Pokémon card + Detail validation
// ------------------------------
When("I click on the first Pokémon card", { timeout: 20000 }, async function (this: CustomWorld) {
  const card = this.page.locator("ul.list li.list-item a").first();

  await expect(card).toBeVisible({ timeout: 10000 });

  // Click and wait for navigation to detail page
  await Promise.all([
    this.page.waitForURL("**/pokemon/*", { timeout: 15000 }),
    card.click(),
  ]);

  const detail = new DetailPage(this.page);
  await detail.waitForDetailLoaded({ timeout: 15000 });
});

Then("I should see fewer details on the Pokémon detail page", async function (this: CustomWorld) {
  const detail = new DetailPage(this.page);

  await detail.validateSections(
    ["types", "abilities", "height", "weight"], // should be missing
    ["stats", "base stats", "description"],     // should be present
    this.attach.bind(this)                      // attach for report
  );
});
