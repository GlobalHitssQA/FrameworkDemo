Feature: Prospect Search Highlighting
  As an advisor
  I want to search for prospects and see matching characters highlighted
  So that I can quickly identify relevant results

  Scenario: Verify matching characters are highlighted in prospect search results
    Given the advisor is logged into Acticenter
    And the advisor is on the dashboard
    When the advisor navigates to the prospect search field
    And the advisor enters at least 2 characters matching existing prospect names
    Then the system displays a list of matching prospects
    And the matching characters in prospect names are highlighted
    And all matching characters across all prospects are consistently highlighted