Feature: Pokémon Detail Page

  # Known bug on main branch: detail page sometimes fails to render h1/img
  @bug-main @firefox
  Scenario: Open first Pokémon detail page
    Given I open the Pokédex home page
    When I click on the first Pokémon
    Then I should see the detail page with a name and sprite
    # Updated validation for actual labels in Fix-1
    And I should see key detail sections like "Base Stats" and "Description"
