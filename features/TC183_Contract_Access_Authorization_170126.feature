Feature: Contract Access Authorization

  Scenario: User can only view information from authorized contracts
    Given the user is authenticated with specific assigned contracts
    When the user searches and selects an assigned contract
    Then the system displays the contract value and composition component
    When the user searches and selects a non-assigned contract
    Then the system denies access or shows an authorization error message
    And the system only displays contracts authorized for the user