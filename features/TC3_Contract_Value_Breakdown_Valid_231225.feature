Feature: Contract Value Breakdown Validation
  As a user of Acticenter
  I want to verify that purchasing power and cash are displayed correctly
  So that different contract types show their respective financial items

  Background:
    Given the user is authenticated in Acticenter
    And a Casa de Bolsa contract is available with currentCash balance
    And a Banco contract is available with cuenta eje balance
    And the Asesor currentCash module is operational
    And SAP Pasivos services are available for cuenta eje consultation

  Scenario: Validate Poder de compra MXN displays only for Casa de Bolsa contracts and Efectivo MXN only for Banco contracts
    When the user navigates to Acticenter and selects a Casa de Bolsa contract
    Then the total contract value component is displayed
    When the user opens the contract value breakdown for Casa de Bolsa
    Then the breakdown popup is displayed completely
    And the Poder de compra MXN item is visible with the correct currentCash value from Asesor module
    And the Efectivo MXN item is not displayed in the breakdown
    When the user closes the popup and selects a Banco contract
    Then the Banco contract is selected and total value component is displayed
    When the user opens the contract value breakdown for Banco
    Then the breakdown popup is displayed completely
    And the Efectivo MXN item is visible with the correct cuenta eje balance
    And the Poder de compra MXN item is not displayed in the breakdown
    And both financial items display correct monetary format with two decimals