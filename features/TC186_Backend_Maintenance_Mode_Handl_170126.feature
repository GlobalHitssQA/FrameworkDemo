Feature: Backend Maintenance Mode Handling
  As a user of the OTA-ACTICENTER system
  I want the system to gracefully handle backend maintenance situations
  So that I receive informative messages instead of technical errors

  Scenario: System displays maintenance message when backend services are unavailable
    Given the backend services for contract value consultation are in maintenance mode
    And I am authenticated in the system
    When I select a contract and navigate to the funds operation screen
    And I attempt to view the contract value and composition component
    Then the system should display an informative maintenance message
    And the system should not display any technical errors
    And the application should remain stable without failures