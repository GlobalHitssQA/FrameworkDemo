Feature: Prospect Search Database Verification

  Scenario: Verify prospect search queries Salesforce database
    Given the advisor is logged into Acticenter
    When the advisor accesses the prospect search field
    And the advisor enters valid search criteria with more than 2 characters
    And the system executes the search query
    Then the system should query the Salesforce database
    And the search results should be retrieved from Salesforce database