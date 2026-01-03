Feature: Prospect Search Integration with Salesforce

  Scenario: Advisor searches for a valid prospect and retrieves information from Salesforce
    Given the advisor user is authenticated in Acticenter
    When the advisor navigates to the prospect search functionality
    And the advisor enters a valid prospect name in the search field
    And the advisor executes the search
    Then the search results display prospect information from Salesforce
    And the prospect details include name and email address