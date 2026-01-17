Feature: Audit Trail for Contract Value and Composition Component Interactions

  Scenario: Verify all user interactions with the value and composition component are logged for traceability and audit
    Given the audit and logging system is configured and active
    And a user with valid credentials exists in the system
    And an active contract is available in the system
    When the user accesses the Acticenter module and logs in
    Then the system should log the login event with user, date and time
    When the user selects a Casa de Bolsa contract
    Then the system should log the contract selection event with user, selected contract and timestamp
    When the user clicks on the component to display the breakdown popup
    Then the system should log the popup open event with user, contract, timestamp and action performed
    When the user closes the popup by clicking outside the component
    Then the system should log the popup close event with the same contextual information
    When the administrator queries the system audit logs
    Then all performed events should be registered chronologically with complete information
    And it should be possible to reconstruct the complete sequence of user actions from the audit logs