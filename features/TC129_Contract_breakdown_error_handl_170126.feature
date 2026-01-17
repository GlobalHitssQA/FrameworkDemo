Feature: Contract breakdown error handling
  As a user of Acticenter
  I want to see friendly error messages when the contract breakdown fails to load
  So that I understand what happened and can take action

  Scenario: Display friendly error messages when backend errors occur in contract breakdown component
    Given the user is authenticated in Acticenter
    And the backend service is configured to simulate errors
    When a backend service error is simulated for contract breakdown data
    Then the system detects the service error
    When the user clicks on the total contract value component to open the breakdown popup
    Then a friendly error message is displayed to the user
    And the error message is user-friendly without technical details
    And the message is clear in Spanish and suggests an action
    When a timeout error is simulated for data loading
    Then an appropriate timeout message is displayed
    When the user dismisses the error message
    Then the user can retry opening the breakdown popup