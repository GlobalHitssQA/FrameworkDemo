Feature: USD Currency Symbol Display Verification
  As a user with a Casa de Bolsa or Banco Persona Moral contract
  I want to see the correct currency symbol for USD values
  So that I can clearly distinguish between MXN and USD amounts

  Scenario: Verify USD values display correct currency symbol in contract breakdown
    Given I am authenticated in Acticenter
    And I have a Casa de Bolsa contract or Banco Persona Moral contract with Mexdolar account
    When I select the contract with USD balance
    Then the contract value and composition component is displayed
    When I click on the component to expand the breakdown
    Then the popup displays the breakdown with all items including Efectivo USD
    And the Efectivo USD item displays the dollar symbol before the value
    And the Efectivo USD item is clearly distinguishable from Efectivo MXN by its label
    And the monetary format is consistent with standards