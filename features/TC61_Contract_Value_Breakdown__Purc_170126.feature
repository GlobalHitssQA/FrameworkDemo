Feature: Contract Value Breakdown - Purchasing Power Label Verification

  Scenario: Verify the Purchasing Power label name in the contract value breakdown
    Given the user is authenticated in Acticenter
    And a Casa de Bolsa contract is available for consultation
    When the user selects a Casa de Bolsa contract
    Then the system displays the operation screen with the total contract value component
    When the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the Purchasing Power item is visible in the breakdown list
    And the item name displays as "Poder de compra MXN" according to Look and Feel specifications