Feature: Contract value breakdown - Fondos de deuda item verification

  Scenario: Verify Fondos de deuda item name in contract value breakdown
    Given the user is authenticated in Acticenter
    And the user has selected a contract with debt fund investments
    When the user views the operation screen
    Then the total contract value component should be displayed
    When the user clicks on the total contract value component
    Then the contract value breakdown popup should be displayed
    And the item named Fondos de deuda should be visible in the breakdown list
    And the Fondos de deuda item should match the specified Look and Feel design