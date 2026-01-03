Feature: Salesforce Database Integration
  As a QA tester
  I want to verify that Acticenter integrates correctly with Salesforce database
  So that prospect information is accurately synchronized and displayed

  Scenario: Verify Salesforce database integration for prospect search
    Given Salesforce database connectivity is established for test environment
    And test prospect records exist in Salesforce with known attributes
    When I search for a known test prospect in Acticenter
    Then the search results should match Salesforce records exactly
    And prospect name should match Salesforce data
    And prospect email should match Salesforce data
    And prospect assignment should match Salesforce data
    When I update prospect information in Salesforce
    And I re-run the search in Acticenter
    Then the updated information should be reflected in search results
    When Salesforce database connection is unavailable
    And I attempt to search for a prospect
    Then an appropriate error message should be displayed indicating database connection issue