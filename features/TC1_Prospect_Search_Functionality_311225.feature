Feature: Prospect Search Functionality
  As an advisor user
  I want to search for prospects in the Pitchbook section
  So that I can find and view prospect information from Salesforce

  Background:
    Given the user is logged in as an advisor with Pitchbook access
    And the Salesforce database is accessible

  Scenario: Validate prospect search triggers after entering more than 2 characters
    Given the user is on the Acticenter dashboard
    When the user navigates to the Pitchbook section
    Then the prospect search field should be displayed and enabled
    When the user types "Jo" in the prospect search field
    Then no search results should be displayed
    When the user types an additional character "h" in the prospect search field
    Then the search should be triggered automatically
    And the search results should display prospect name and email address
    When the user clears the search field
    And the user types "Johan" in the prospect search field
    Then the search should be triggered automatically
    And the search results should display matching prospects from Salesforce