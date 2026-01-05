Feature: Prospect Search Information Display
  As an advisor
  I want to view prospect name and email in search results
  So that I can identify the correct prospect before selection

  Scenario: Display prospect name and email in search results
    Given the advisor is on the prospect search screen
    When the advisor enters valid search criteria
    And the advisor executes the search
    Then the system displays matching prospects
    And each prospect shows name and email address
    And matching characters are highlighted
    And the information is sufficient for identification
    And scroll functionality is available for more than 5 results