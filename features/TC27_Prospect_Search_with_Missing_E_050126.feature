Feature: Prospect Search with Missing Email Validation
  As an advisor
  I want to search for prospects in the system
  So that I can only view and select prospects with complete required information including email addresses

  Scenario: Verify prospects without email are excluded from search results
    Given test data exists with at least one prospect without an email address in Salesforce
    And I am logged in to Acticenter as an advisor
    When I navigate to the prospect search interface
    And I enter search criteria that matches the prospect without email
    And I perform the search
    Then the prospect without email should not be displayed in the search results
    And the system should handle the missing data gracefully without errors
    When I search for prospects with complete data including email
    Then the system should display prospects with complete information
    And only prospects with required information should be selectable
    And each displayed prospect should show name and email address