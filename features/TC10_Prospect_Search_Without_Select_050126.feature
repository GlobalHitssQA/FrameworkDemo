Feature: Prospect Search Without Selection
  As an advisor
  I want to search for prospects without selecting them
  So that I can review results without triggering navigation

  Scenario: Search prospects and remain on dashboard without selection
    Given the advisor is logged into Acticenter
    When the advisor enters at least 2 characters in the prospect search field
    Then the system displays a list of matching prospects
    When the advisor reviews the search results without clicking any prospect
    And the advisor clicks outside the search results area
    Then the system remains on the current dashboard
    And no navigation to other screens occurs