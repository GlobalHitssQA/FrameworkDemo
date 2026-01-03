Feature: Prospect Search Functionality

  Scenario: Verify prospect search field accepts name and email criteria
    Given the advisor user has accessed the Acticenter dashboard
    And the dashboard loads successfully with search field visible
    When the advisor clicks on the prospect search input field
    Then the search field becomes active and cursor is positioned for input
    When the advisor types alphanumeric characters into the search field
    Then the characters are accepted and displayed in the search field
    And the search field accepts prospect name as search criteria
    And the search field accepts electronic email as search criteria
    When the advisor enters more than 2 characters and clicks the search icon
    Then the search executes and queries Salesforce database
    And matching results are returned