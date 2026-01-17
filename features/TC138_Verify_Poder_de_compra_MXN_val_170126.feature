Feature: Verify Poder de compra MXN value matches currentcash from Modulo Asesor for Casa de Bolsa contracts

  Scenario: Compare Poder de compra MXN in Acticenter with currentcash from Modulo Asesor
    Given I am authenticated in Modulo Asesor
    And I query a Casa de Bolsa contract and note the currentcash value
    When I open Acticenter and select the same Casa de Bolsa contract
    And I click on the contract value component to display the breakdown
    Then the Poder de compra MXN value in Acticenter should match the currentcash value from Modulo Asesor