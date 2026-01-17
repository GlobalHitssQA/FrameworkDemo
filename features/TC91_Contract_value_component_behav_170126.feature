Feature: Contract value component behavior when backend is disconnected

  Scenario: Verify error message when backend is unavailable for contract value consultation
    Given the user is authenticated in the system
    And a contract is previously selected
    And the backend services are disconnected
    When the user attempts to load the contract value and composition component
    Then the system detects the lack of connection with the backend
    And an appropriate error message is displayed to the user
    And the component does not show incorrect or blank data without notification