Feature: Casa de Bolsa Persona Moral contract breakdown displays Poder de compra MXN

  Scenario: Verify Poder de compra MXN is displayed in the breakdown for Casa de Bolsa Persona Moral contracts
    Given the user is authenticated in Acticenter
    And a Casa de Bolsa Persona Moral contract is active
    When the user selects a Casa de Bolsa Persona Moral contract
    Then the system displays the operation screen with the selected contract
    When the user clicks on the total contract value component
    Then the system displays the breakdown popup with contract items
    And the Poder de compra MXN item is visible in the breakdown list
    And the Poder de compra MXN value is displayed on the right side
    And the Poder de compra MXN value matches the currentcash value from Modulo Asesor