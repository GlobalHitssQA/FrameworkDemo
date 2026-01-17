Feature: Contract breakdown popup displays applicable items based on contract type

  Scenario: Verify popup breakdown shows only applicable items per contract type
    Given the user is authenticated in Acticenter
    When the user selects a Casa de Bolsa contract
    Then the system loads the Casa de Bolsa contract information
    When the user clicks on the total value component to display the breakdown
    Then the system displays the popup with the items breakdown
    And the item Poder de compra MXN is visible in the breakdown
    And the item Efectivo MXN is not visible for Casa de Bolsa
    When the user selects a Banco contract
    And the user clicks on the total value component to display the breakdown
    Then the item Efectivo MXN is visible in the breakdown
    And the item Poder de compra MXN is not visible for Banco