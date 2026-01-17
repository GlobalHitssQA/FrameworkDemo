Feature: Contract Value Breakdown for Casa de Bolsa
  As an authenticated user
  I want to view the contract value breakdown for Casa de Bolsa contracts
  So that I can see only the applicable items without Bank-specific items

  Scenario: Verify Casa de Bolsa contract does not show Bank-specific items in breakdown
    Given the user is authenticated in Acticenter
    When the user selects a Casa de Bolsa contract
    And the user clicks on the total value component to open the breakdown
    Then the item Efectivo en transito should not be displayed
    And the item Poder de compra MXN should be displayed
    And only Casa de Bolsa applicable items should be shown