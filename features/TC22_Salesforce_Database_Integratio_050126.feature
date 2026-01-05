Feature: Salesforce Database Integration for Prospect Search

  Scenario: Verify prospect search queries Salesforce database with proper filtering
    Given the Salesforce database connection is established and active
    When the advisor navigates to the prospect search screen
    And the advisor enters valid search criteria
    And the advisor executes the search
    Then the system queries the Salesforce database for matching prospects
    And the results are filtered to show only prospects from the advisor's cell or financial center
    And prospects without email addresses are excluded from the results
    And the database consultation is executed in Salesforce DB successfully