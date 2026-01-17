Feature: Verify OTAPAS-281 Story Changes Implementation
  As a QA tester
  I want to verify that changes from user story OTAPAS-281 are correctly implemented
  So that the contract value component displays correct data for all scenarios

  Scenario: Validate all OTAPAS-281 changes are correctly implemented in the component
    Given I have access to the contract value component
    When I verify the buying power MXN for Casa de Bolsa uses currentcash from Modulo Asesor
    Then the buying power should be displayed correctly according to updated specification
    And I verify the cash MXN for Banco shows the axis account cash
    And the bank cash should be displayed correctly according to updated specification
    And I verify the cash USD for Casa de Bolsa shows the dollar currency amount
    And the Casa de Bolsa USD cash should be displayed correctly
    And I verify the cash USD for Banco PM with Mexdolar takes SAP value without conversion
    And the Mexdolar balance should be displayed in USD without exchange rate conversion
    And I verify the transit cash concept only takes SAP prenotes information for Banco
    And the transit cash should only be displayed for Banco contracts with prenotes data
    And I verify Mexdolar PM contracts are displayed in read-only mode
    And the buy-sell icon should be disabled for Mexdolar contracts