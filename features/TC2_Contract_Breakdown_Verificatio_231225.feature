Feature: Contract Breakdown Verification for Casa de Bolsa
  As a private banking advisor
  I want to view the complete breakdown of items in a pop-up for a Casa de Bolsa contract
  So that I can verify all financial details of a Physical Person contract

  Background:
    Given the user is authenticated in Acticenter with private banking advisor profile
    And a Physical Person Casa de Bolsa contract is available
    And Asset allocation services and microservices AGAS-21435 to AGAS-21806 are operational
    And integration with Lumina is working correctly

  Scenario: Verify complete breakdown of items in pop-up for Casa de Bolsa Physical Person contract
    Given the advisor accesses Acticenter platform
    When the advisor selects a Physical Person Casa de Bolsa contract using BP contract search function
    Then the Casa de Bolsa contract information loads correctly
    When the advisor clicks on the total contract value component
    Then the pop-up with total valuation breakdown is displayed
    And the "Poder de compra MXN" item shows the currentCash value from Casa de Bolsa contract
    And all applicable items are displayed: "Poder de compra MXN", "Efectivo USD", "Pendientes por liquidar", "Fondos de deuda", "Fondos de cobertura", "Fondos de renta variable", "Cedes y pagarés", "Mercado de dinero", "Mercado de capitales"
    And each item displays its corresponding monetary value on the right side
    And items without monetary value show "$0.00"
    And the "Efectivo USD" item shows the correct USD currency amount
    And the Asset allocation service information is correctly displayed in the breakdown
    When the advisor clicks outside the pop-up component
    Then the pop-up closes properly