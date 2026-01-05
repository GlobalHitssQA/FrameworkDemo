Feature: Prospect Email Validation
  As a user of the Actinver platform
  I want to search for prospects with valid email addresses
  So that I can ensure only prospects with electronic email are displayed

  Scenario: Verify only prospects with valid email addresses are displayed
    Given I am on the prospect search page
    When I enter search criteria to retrieve prospects with email addresses
    Then the search results should display prospects with electronic email field
    And prospects without email in Salesforce DB should not be displayed
    And all displayed email addresses should follow correct format validation