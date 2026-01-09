Feature: Prospect search validation within advisor's active list in Salesforce

  Scenario: Validate prospect search shows only active prospects assigned to the logged-in advisor
    Given the advisor is logged into Acticenter as a Patrimonial, Private or Wealth Management banker
    And the advisor has active prospects assigned in Salesforce
    When the advisor navigates to the prospect search functionality for Pitchbook
    Then the system should enable the prospect search field
    When the advisor enters more than 2 characters matching an active prospect in the search field
    Then the system should display only active prospects assigned to the logged-in advisor
    And the displayed prospects should match the active prospect list in Salesforce database
    When the advisor searches for a prospect not in their active list
    Then the system should not display that prospect in the search results