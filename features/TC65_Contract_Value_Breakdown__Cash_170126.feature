Feature: Contract Value Breakdown - Cash USD Label Verification

  Scenario: Verify the Cash USD label name in contract value breakdown
    Given the user is authenticated in Acticenter
    And the user has selected a contract that handles USD currency
    When the user views the operation screen with the total contract value component
    And the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the Cash USD label is visible in the breakdown list
    And the Cash USD label name matches the Look and Feel specifications