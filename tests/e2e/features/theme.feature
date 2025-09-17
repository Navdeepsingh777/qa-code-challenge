Feature: Theme Preferences

  # Known bug on main branch: dropdown works but dark mode class not applied
  @bug-main
  Scenario: Switch to Dark Mode
    Given I open the Pokédex home page
    When I navigate to Settings
    And I change the theme to "Dark"
    Then the theme should be set to "Dark"
