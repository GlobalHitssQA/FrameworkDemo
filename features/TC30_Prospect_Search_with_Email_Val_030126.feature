Feature: Prospect Search with Email Validation

  Scenario: Search and select prospect with valid email key from Salesforce
    Given the user is on the Acticenter dashboard prospect search interface
    When the user enters at least 2 characters in the search field
    Then matching prospects are displayed in the results
    And prospects without email key in Salesforce are not displayed
    When the user selects a prospect with valid email key from the results
    Then the selected prospect information is displayed with name and email key
    And the system continues to the AGAS-43 selection process flow