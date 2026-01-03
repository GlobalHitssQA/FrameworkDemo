Feature: Prospect Search Result Limit Validation

  Scenario: Verify that only 5 prospect matches are displayed on initial search screen
    Given the advisor user has accessed the Acticenter dashboard
    When the advisor navigates to the prospect search functionality
    And the advisor enters a search term that returns more than 5 results
    Then exactly 5 prospect matches should be displayed on the initial screen
    And each result should display the prospect name and email key