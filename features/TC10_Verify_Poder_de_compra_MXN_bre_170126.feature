Feature: Verify Poder de compra MXN breakdown for Casa de Bolsa Persona Moral contract

  Scenario: Display Poder de compra MXN with correct value in contract breakdown popup
    Given the user is authenticated in Acticenter
    And a Casa de Bolsa contract for Persona Moral is selected
    When the user clicks on the total contract value component
    Then the breakdown popup is displayed
    And the Poder de compra MXN item is visible in the breakdown list
    And the Poder de compra MXN value is aligned to the right
    And the displayed amount matches the currentcash value for Casa de Bolsa contract
    And if the contract has no balance the system displays zero pesos