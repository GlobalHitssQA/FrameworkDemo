Feature: Advisor Prospect Search Scope Validation

  Scenario: Verify that advisor can only view prospects assigned to their cell or financial center
    Given the advisor user is logged into Acticenter
    And the advisor is assigned to a specific cell or financial center
    When the advisor accesses the prospect search functionality
    And the advisor executes a search for prospects
    Then only prospects assigned to the advisor or advisors from the same cell or financial center are displayed
    And prospects assigned to other cells or financial centers are not displayed