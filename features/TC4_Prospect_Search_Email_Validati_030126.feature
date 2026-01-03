Feature: Prospect Search Email Validation

  Scenario: Verify that prospects without email addresses are excluded from search results
    Given I am logged in to Acticenter as a Wealth Management Advisor
    When I navigate to the prospect search section
    And I enter a search query for a prospect without email address
    Then the prospect without email should not be displayed in the search results
    When I enter a search query for a prospect with email address
    Then the prospect with email should be displayed in the search results