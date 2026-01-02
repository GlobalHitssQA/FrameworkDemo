Feature: Prospect Search with No Results

  Scenario: Search for a prospect that does not exist in the database
    Given the advisor is on the Acticenter dashboard
    When the advisor enters a search query with no matching prospects
    And the advisor executes the search
    Then a no results message is displayed
    And the dashboard remains functional for new searches