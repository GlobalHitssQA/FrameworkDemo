Feature: USD Cash Display for Banco Persona Moral Contract with Mexdolar Account

  Scenario: Verify USD Cash section displays for Banco Persona Moral contract with associated Mexdolar account
    Given the user is authenticated in Acticenter module
    When the user selects a Banco Persona Moral contract with an associated Mexdolar account
    And the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the USD Cash section is visible in the breakdown
    And the USD Cash amount matches the Mexdolar account balance