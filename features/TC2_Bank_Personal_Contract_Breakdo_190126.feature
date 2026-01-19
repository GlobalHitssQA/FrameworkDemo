Feature: Bank Personal Contract Breakdown with Mexdolar Account
  As a user of Acticenter
  I want to view the complete breakdown of items for Bank Personal contracts with Mexdolar account
  So that I can verify all financial categories are displayed correctly

  Scenario: Verify complete breakdown of items for Bank Personal Physical contract with associated Mexdolar account
    Given I am authenticated in Acticenter
    And I have navigated to the funds operation module
    When I select a Bank Personal Physical contract with associated Mexdolar account
    Then the system loads the selected contract information
    When I click on the contract value and composition component
    Then the popup with detailed breakdown of items is displayed
    And the item "Efectivo MXN" shows the peso balance from the bank contract core account
    And the item "Efectivo USD" shows the dollar value from SAP for the Mexdolar account
    And the items "Fondos de deuda" "Fondos de cobertura" and "Fondos de renta variable" show their corresponding monetary values
    And the item "Pendientes por liquidar" shows the accumulated pending operations amount
    And the item "Efectivo en transito" is displayed for bank contracts
    And the items "Cedes y pagares" "Mercado de dinero" and "Mercado de capitales" show their monetary accumulated values