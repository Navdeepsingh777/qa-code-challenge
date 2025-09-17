Feature: Settings Page

  # Known bug on main branch: theme dropdown updates but UI dark mode is not applied
  @bug-main
  Scenario: Change theme to Dark
    Given I open the Pokédex home page
    When I navigate to Settings
    And I change the theme to "Dark"
    Then the theme should be set to "Dark"

  # Known bug on main branch: page size setting not applied correctly
  @bug-main
  Scenario: Change page size to 5
    Given I open the Pokédex home page
    When I navigate to Settings
    And I change the page size to 5
    Then the page size should be set to 5
    When I return to the home page
    Then I should see exactly 5 Pokémon cards on the home page

  # Known bug on main branch: unchecked fields not reflected correctly
  @bug-main
  Scenario: Uncheck first three detail fields
    Given I open the Pokédex home page
    When I navigate to Settings
    And I uncheck the first three detail fields
    Then the first three detail fields should not be selected
    When I return to the home page
    And I click on the first Pokémon card
    Then I should see fewer details on the Pokémon detail page
