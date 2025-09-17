Feature: Pokémon Pagination

  Scenario: Navigate to the next and previous pages
    Given I open the Pokédex home page
    And I note the name of the first Pokémon
    When I click on the "Next" button
    Then I should see a different first Pokémon
    When I click on the "Previous" button
    Then I should see the original first Pokémon again
