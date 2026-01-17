Feature: Contract traceability verification
  As a system auditor
  I want to verify that all operations maintain complete traceability
  So that compliance and audit requirements are met

  Scenario: Verify complete traceability for contract composition operations
    Given the user is authenticated in the system
    And the user selects a contract with composition data
    When the user expands the contract value breakdown
    Then the system displays the popup with all composition items
    When the user performs a query action on the Debt Funds item
    Then the system processes the action and generates a traceability record
    When the user consults the system logs for the operation
    Then the system shows the log entry with unique identifier and user
    And the log entry contains timestamp and contract information
    And the log entry contains the queried item and result