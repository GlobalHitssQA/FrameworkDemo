Feature: Integration with currentcash service for Casa de Bolsa contracts

  Scenario: Verify Poder de compra MXN is obtained from currentcash service for Casa de Bolsa contract
    Given the user is authenticated in Acticenter
    And the currentcash service from Modulo Asesor is available
    When the user selects a Casa de Bolsa contract
    Then the system loads the selected contract
    When the user clicks on the contract value component to display the breakdown
    Then the system invokes the currentcash service from Modulo Asesor
    And the breakdown popup is displayed
    When the user verifies the Poder de compra MXN field in the breakdown
    Then the system displays the Poder de compra MXN value obtained from currentcash service
    And the Poder de compra MXN value matches the current cash value from Modulo Asesor