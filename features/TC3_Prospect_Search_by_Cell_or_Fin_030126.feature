Feature: Prospect Search by Cell or Financial Center

  Scenario: Advisor searches prospects within assigned cell or financial center
    Given the advisor is logged in to Acticenter with assigned cell or financial center
    When the advisor navigates to the prospect search module
    And the advisor enters search criteria for a prospect
    And the advisor executes the search
    Then the system queries Salesforce filtering by the advisor's cell or financial center
    And only prospects assigned to advisors within the same cell or financial center are displayed