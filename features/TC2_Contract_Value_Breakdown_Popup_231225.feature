Feature: Contract Value Breakdown Popup Validation for Legal Entity in Brokerage House

  As an advisor in the Brokerage House
  I want to view the detailed breakdown of a Legal Entity contract value
  So that I can verify all financial components including purchasing power, cash, funds, and market instruments

  Background:
    Given the advisor user is authenticated in the Brokerage House system
    And the contract valuation services are operational
    And the Advisor currentCash module is available
    And the funds, CDs, promissory notes and markets API are functioning correctly

  Scenario: Display complete contract value breakdown popup for Legal Entity
    Given the advisor has accessed Acticenter system
    When the advisor searches for a Legal Entity contract in the Brokerage House
    And the advisor selects the Legal Entity contract
    Then the total contract value component should be displayed
    When the advisor clicks on the total contract value component
    Then a popup with the complete contract value breakdown should be displayed
    And the "Poder de compra MXN" item should display the currentCash value from Advisor Module aligned to the right
    And the "Efectivo USD" item should display the USD cash amount aligned to the right
    And the "Pendientes por liquidar" item should display the accumulated pending settlements amount
    And the "Fondos de deuda" item should display the debt funds accumulated value
    And the "Fondos de cobertura" item should display the hedge funds accumulated value
    And the "Fondos de renta variable" item should display the equity funds accumulated value
    And the "Cedes y pagarés" item should display the CDs and promissory notes accumulated value
    And the "Mercado de dinero" item should display the money market accumulated value
    And the "Mercado de capitales" item should display the capital market accumulated value
    And all items without value should display "$0.00"
    And the breakdown list should be vertically aligned with the total value component