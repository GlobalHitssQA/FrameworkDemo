Feature: Contract value breakdown cash MXN section verification

  Scenario: Verify the Efectivo MXN item name in the contract value breakdown
    Given the user is authenticated in Acticenter
    When the user selects a Bank contract
    Then the system displays the operation screen with the total contract value component
    When the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    When the user locates the Efectivo MXN item in the breakdown list
    Then the item is displayed with the name Efectivo MXN
    And the Efectivo MXN item name complies with the typography size and format specified in the Look and Feel