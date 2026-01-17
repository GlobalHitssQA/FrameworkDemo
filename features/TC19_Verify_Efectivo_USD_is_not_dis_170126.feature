Feature: Verify Efectivo USD is not displayed for Banco Persona Moral contracts without Mexdolar account

  Scenario: Efectivo USD rubro should be hidden for Banco Persona Moral contract without Mexdolar account
    Given the user is authenticated in Acticenter
    When the user selects a Banco Persona Moral contract without Mexdolar account
    And the user clicks on the total contract value component
    Then the contract value breakdown popup should be displayed
    And the Efectivo USD rubro should not be visible in the breakdown
    And only applicable rubros for Banco contracts without Mexdolar should be displayed