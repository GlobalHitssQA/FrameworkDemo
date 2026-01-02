Feature: Salesforce Database Query Verification for Prospect Search

  Scenario: Verify that prospect search executes queries against Salesforce database
    Given database query logging is configured and active
    And the advisor is logged in to Acticenter
    When the advisor accesses the prospect search functionality
    And the advisor enters search criteria in the search field
    And the advisor clicks the search icon to execute the search
    Then a query should be logged showing execution against Salesforce database
    And the search results should match records from Salesforce database