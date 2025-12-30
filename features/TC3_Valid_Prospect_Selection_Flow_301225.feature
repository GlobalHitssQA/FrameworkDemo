Feature: Valid Prospect Selection Flow
  As an advisor user in Acticenter
  I want to search and select a valid prospect with email
  So that I can continue with the business process flow

  Scenario: Successfully select a valid prospect with email and navigate to next screen
    Given the user is logged in as advisor in Acticenter application
    And the Salesforce database is accessible with established connectivity
    When the user navigates to the prospect search screen
    Then the prospect search screen is displayed with search functionality available
    When the user enters at least 3 characters matching an existing prospect with valid email
    Then the search is triggered and matching results are displayed in the coincidence list
    And the coincidence list displays prospects with both name and email fields populated
    When the user selects a valid prospect from the coincidence list that has an email address
    Then the prospect is highlighted as selected in the interface
    When the user clicks the continue button to proceed with the selected prospect
    Then the system validates the selected prospect has required data including email address
    And the application navigates to the next screen in the process flow
    And the prospect name and email are correctly displayed in the subsequent screen