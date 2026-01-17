Feature: Verify Efectivo MXN item displays correctly in breakdown for Banco Persona Moral contracts

  Scenario: Efectivo MXN appears in contract breakdown for Banco Persona Moral
    Given the user is authenticated in Acticenter
    When the user selects a Banco Persona Moral contract from the contract selector
    Then the system displays the total contract value component
    When the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the Efectivo MXN item is visible in the breakdown list with its monetary value
    And the Poder de compra MXN item is not visible in the breakdown list