Feature: Mexdolar Persona Moral contract view-only mode in Acticenter

  Scenario: Verify Mexdolar Persona Moral contracts are displayed in view-only mode
    Given the user is authenticated and on the Acticenter main screen
    When the user selects a Mexdolar Persona Moral contract
    Then the contract information should be displayed
    And the contract should be in view-only mode without operation options
    And the system should not allow buy or sell operations on the contract