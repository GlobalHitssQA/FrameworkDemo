Feature: Prospect Search Email Key Validation
  As a system administrator
  I want to ensure that prospects without email keys are filtered from search results
  So that only valid prospects are displayed to advisors in Acticenter

  Scenario: Verify prospect without email key is excluded from search results
    Given a prospect exists in Salesforce without an email key field populated
    And I am logged in to Acticenter as an advisor
    When I navigate to the prospect search functionality
    And I execute a search that would normally include the prospect without email key
    Then the prospect without email key should not appear in the search results
    And only prospects with valid email keys should be displayed