import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world.ts";

let firstPokemonName: string;

// Note the first Pokémon name on page load
Given("I note the name of the first Pokémon", async function (this: CustomWorld) {
  const firstLink = this.page.locator("a[href^='/pokemon/']").first();
  firstPokemonName = await firstLink.innerText();
});

// Navigate to next page
When('I click on the "Next" button', async function (this: CustomWorld) {
  await this.page.getByRole("button", { name: "Next page" }).click();
  await this.page.waitForTimeout(1000); // small wait for list update
});

// Navigate to previous page
When('I click on the "Previous" button', async function (this: CustomWorld) {
  await this.page.getByRole("button", { name: "Previous page" }).click();
  await this.page.waitForTimeout(1000);
});

// Validate first Pokémon changed
Then("I should see a different first Pokémon", async function (this: CustomWorld) {
  const newName = await this.page.locator("a[href^='/pokemon/']").first().innerText();
  expect(newName).not.toBe(firstPokemonName);
});

// Validate we returned to original Pokémon
Then("I should see the original first Pokémon again", async function (this: CustomWorld) {
  const name = await this.page.locator("a[href^='/pokemon/']").first().innerText();
  expect(name).toBe(firstPokemonName);
});
