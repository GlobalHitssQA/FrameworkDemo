Feature: Verify Efectivo USD item displays for Banco Persona Moral contracts with Mexdolar account

  Scenario: Efectivo USD item appears in contract breakdown for Banco Persona Moral with Mexdolar account
    Given the user is authenticated in Acticenter
    When the user selects a Banco Persona Moral contract with associated Mexdolar account
    And the user clicks on the total contract value component
    Then the contract value breakdown popup is displayed
    And the system validates the Mexdolar account association
    And the Efectivo USD item is visible in the breakdown list
    And the Efectivo USD value is displayed in USD currency format