Feature: Salesforce Prospect Search Integration

  Scenario: Verify prospect search retrieves data from Salesforce database
    Given the user is logged in to Acticenter as a Wealth Management Advisor
    When the user navigates to the prospect search section
    And the user enters a prospect name with more than 2 characters
    Then the search query should be executed against Salesforce database
    And the search results should correspond to records stored in Salesforce
    And the system should confirm the query was performed in Salesforce database