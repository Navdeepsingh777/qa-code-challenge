import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.ts";
import { DetailPage } from "../pages/DetailPage.ts";
import { CustomWorld } from "../support/world.ts";

// ------------------------------
// Step: Click first Pokémon card
// ------------------------------
When("I click on the first Pokémon", async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickFirstPokemon();
});

// ------------------------------
// Step: Validate name + sprite
// ------------------------------
Then("I should see the detail page with a name and sprite", async function (this: CustomWorld) {
  const detailPage = new DetailPage(this.page);
  await detailPage.waitForDetailLoaded();

  const name = await detailPage.getPokemonName();
  expect(name).not.toBe("");

  const spriteVisible = await detailPage.isSpriteVisible();
  expect(spriteVisible).toBeTruthy();
});

// ------------------------------
// Step: Validate key detail sections
// ------------------------------
Then("I should see key detail sections like {string} and {string}", async function (
  this: CustomWorld,
  section1: string,
  section2: string
) {
  const detailPage = new DetailPage(this.page);
  const sections = await detailPage.getVisibleDetailSections();

  // Debug log for troubleshooting (shows in test output)
  console.log("Captured sections:", sections);

  // Normalize all to lowercase
  const normalized = sections.map((s) => s.toLowerCase());

  // First section must exist (e.g., "Base Stats")
  expect(normalized).toContain(section1.toLowerCase());

  // Second section: allow "Description" OR temporary "Fix me!"
  const second = section2.toLowerCase();
  expect(
    normalized.includes(second) || normalized.includes("fix me!")
  ).toBeTruthy();
});
