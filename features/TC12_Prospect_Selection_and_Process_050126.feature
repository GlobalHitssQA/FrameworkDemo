Feature: Prospect Selection and Process Flow Navigation
  As an advisor
  I want to search and select a Salesforce prospect
  So that I can continue with the business process flow

  Scenario: Select a prospect and verify navigation to next process step
    Given the advisor is logged in to Acticenter
    And the advisor dashboard is displayed
    When the advisor enters at least 2 characters in the prospect search field
    Then a list of matching Salesforce prospects is displayed
    When the advisor selects a prospect from the coincidence list
    Then the system registers the prospect selection
    And the system navigates away from the dashboard
    And the process selection screen is displayed
    And the selected prospect information is carried forward to the next screen