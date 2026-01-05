Feature: Advisor Prospect Search Functionality
  As an advisor user
  I want to search for prospects that belong to me
  So that I can view only my own prospects from Salesforce

  Scenario: Advisor searches for own prospects successfully
    Given the advisor user is logged into Acticenter
    And the advisor is on the dashboard page
    When the advisor navigates to the prospect search functionality
    Then the search field should be displayed and available for input
    When the advisor enters a prospect name with more than 2 characters
    And the advisor triggers the search
    Then the system should query the Salesforce database
    And the search results should display prospects owned by the advisor
    And only prospects matching the advisor's cell or financial center schema should be shown