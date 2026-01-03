Feature: Prospect Search - No Results Found

  Scenario: Verify no results message is displayed when search query does not match any prospects
    Given the user is logged in to Acticenter as a Wealth Management Advisor
    And the user is on the prospect search section
    When the user enters a search query that does not match any existing prospects
    And the user executes the search
    Then a no results message is displayed
    And the dashboard remains visible
    And the user can perform a new search