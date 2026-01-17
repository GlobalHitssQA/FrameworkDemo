Feature: Contract Value Display with Zero Balances
  As a user of Acticenter
  I want to verify that contracts without balances display correctly
  So that I can confirm the system handles zero-value contracts properly

  Scenario: Verify all contract sections display zero when contract has no balances
    Given the user is authenticated in Acticenter
    And a Casa de Bolsa contract without investments or available cash exists
    When the user searches for the contract using the search magnifier
    And the user selects the contract from the results
    Then the main component should display a total value of "$0.00"
    When the user clicks on the component to expand the breakdown
    Then the breakdown popup should be visible
    And all applicable sections should display "$0.00"
    And the section "Poder de compra MXN" should display "$0.00"
    And the section "Pendientes por liquidar" should display "$0.00"
    And the section "Fondos" should display "$0.00"
    And the section "Cedes y pagarés" should display "$0.00"
    And the section "Mercado de dinero" should display "$0.00"
    And the section "Mercado de capitales" should display "$0.00"