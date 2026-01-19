Feature: Mexdolar Persona Moral contract view-only mode verification

  Scenario: Verify Mexdolar Persona Moral contracts are displayed in view-only mode without currency conversion and operations disabled
    Given the user is authenticated in Acticenter with access to Persona Moral Mexdolar contracts
    When the user searches and selects a Persona Moral contract with associated Mexdolar account
    And the user clicks on the value and composition component to view the breakdown
    Then the cash amount should be displayed as "Efectivo USD" without conversion to Mexican pesos
    And the contract should be displayed in view-only mode without operation options
    And the buy/sell icon should be disabled and not allow opening operation options
    And a visual indicator or message should inform that the contract is view-only