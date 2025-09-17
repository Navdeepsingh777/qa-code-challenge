import { Given } from "@cucumber/cucumber";
import { HomePage } from "../pages/HomePage.ts";
import { CustomWorld } from "../support/world.ts";

Given("I open the Pokédex home page", async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);  // ✅ uses world.page
  await homePage.navigate();
});
