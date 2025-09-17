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
  await this.page.waitForSelector("a[href^='/pokemon/']", { timeout: 10000 }); // ensure cards exist
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
  expect(selected).toContain(theme); // normalize (e.g. "Dark" vs "Dark Mode")

  // ✅ Extra validation for Dark Mode actually being applied
  if (theme.toLowerCase().includes("dark")) {
    const darkActive = await settings.isDarkModeActive();
    expect(darkActive).toBeTruthy(); // Will fail on main, pass on fix-1/fix-2
  }
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
  expect(value).toBe(size);
});

Then("I should see exactly {int} Pokémon cards on the home page", async function (this: CustomWorld, expectedCount: number) {
  const cards = this.page.locator("a[href^='/pokemon/']");
  await expect(cards).toHaveCount(expectedCount); // strict validation
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
  expect(states[0]).toBe(false);
  expect(states[1]).toBe(false);
  expect(states[2]).toBe(false);
});

// ------------------------------
// Click Pokémon card + Detail validation
// ------------------------------
When("I click on the first Pokémon card", async function (this: CustomWorld) {
  const card = this.page.locator("a[href^='/pokemon/']").first();
  await card.click();

  const detail = new DetailPage(this.page);
  await detail.waitForDetailLoaded(); // ⛔ on main this may fail → screenshot captured
});

Then("I should see fewer details on the Pokémon detail page", async function (this: CustomWorld) {
  const detail = new DetailPage(this.page);
  const sections = await detail.getVisibleDetailSections();

  // Normalize labels to lowercase for resilience
  const normalized = sections.map(s => s.toLowerCase());

  // These unchecked fields must NOT appear
  expect(normalized.join(" ")).not.toMatch(/types/);
  expect(normalized.join(" ")).not.toMatch(/abilities/);
  expect(normalized.join(" ")).not.toMatch(/height.*weight/);

  // Other key sections must still appear (accept variations)
  expect(normalized.join(" ")).toMatch(/stats|base stats/);
  expect(normalized.join(" ")).toMatch(/description|fix me!/);
});
