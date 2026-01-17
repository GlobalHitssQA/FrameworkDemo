Feature: Mexdolar contract view only mode

  Scenario: Verify that Mexdolar contracts are displayed in view only mode without allowing operations
    Given the user is authenticated in Acticenter with access to Banco Persona Moral contracts
    When the user searches and selects a Mexdolar type contract from Banco Persona Moral
    Then the system displays the Mexdolar contract information in view only mode
    And all operation functionalities are disabled for the Mexdolar contract
    And attempting to access any operation functionality does not allow any action
    And no errors or Lumina calls are generated when trying to operate