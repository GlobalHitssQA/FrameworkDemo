Feature: Prospect Search Functionality Validation
  As an advisor user
  I want to search for prospects using the search field
  So that I can find matching prospects from the Salesforce database

  Scenario: Validate prospect search is triggered after entering more than 2 characters
    Given the user is logged in as an advisor with Salesforce access
    And the user navigates to the prospect search screen in Acticenter
    Then the prospect search screen is displayed with the search field available
    When the user enters exactly 2 characters in the search field
    Then no search is triggered and the system waits for additional input
    When the user enters a third character in the search field
    Then the search is automatically triggered
    And the system displays matching prospects from the Salesforce database