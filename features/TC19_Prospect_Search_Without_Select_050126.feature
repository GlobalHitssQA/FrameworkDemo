Feature: Prospect Search Without Selection
  As an advisor
  I want to search for prospects without selecting any
  So that I can return to the dashboard without loading prospect details

  Scenario: Search prospects and return to dashboard without selection
    Given the advisor is on the prospect search screen from the dashboard
    When the advisor enters valid search criteria and executes the search
    Then the system displays matching prospects with up to 5 results
    When the advisor reviews the search results without selecting any prospect
    And the advisor clears the search or navigates away
    Then the system returns to the dashboard view
    And no prospect information is loaded or displayed
    And the dashboard remains in its previous state