Feature: Sensitive Contract Data Logging Security Verification
  As a security auditor
  I want to verify that sensitive contract information is not logged
  So that financial data remains protected from exposure

  Scenario: Verify that sensitive contract data is not recorded in system logs
    Given the logging system is configured in verbose or debug mode
    And the user is authenticated in Acticenter
    When the user accesses the contract value and composition component
    And the user expands the contract breakdown details
    And the user performs update operations on the component
    Then the frontend logs should not contain sensitive financial data
    And the backend logs should not contain complete contract numbers
    And all logged identifiers should be masked or use operation codes only