Feature: Salesforce Database Search Validation
  As an advisor user
  I want to search for prospects in the platform
  So that the search is performed exclusively in the Salesforce database

  Scenario: Verify prospect search queries Salesforce database only
    Given the advisor user has accessed the Acticenter dashboard
    When the advisor navigates to the prospect search functionality
    And the advisor enters a search term with at least 2 characters
    And the advisor executes the search
    Then the search should be performed in Salesforce database
    And the search results should include prospects from advisor's list or same financial center
    And only prospects belonging to advisor's Salesforce list are returned