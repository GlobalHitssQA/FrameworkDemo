Feature: Salesforce Integration for Prospect Search in Acticenter

  Scenario: Verify prospect search synchronization with Salesforce database
    Given the user accesses the Acticenter dashboard
    And the connection to Salesforce database is active
    When the user performs a prospect search using valid criteria
    Then the system retrieves matching prospect records from Salesforce
    And the displayed prospect information matches Salesforce data
    When the user searches for a prospect without an electronic email key
    Then the system displays a message indicating the prospect cannot be presented
    When the user performs a search with no matching results
    Then the system displays a no results message
    When the user selects a prospect from the search results
    Then the system navigates to the process selection screen
    And the prospect context from Salesforce is maintained
    When no prospect is selected
    Then the dashboard remains accessible
    And the option to create a new prospect is available