Feature: Contract value breakdown USD cash text color verification

  Scenario: Verify the text color of USD Cash item in contract breakdown matches design specifications
    Given the user is authenticated in Acticenter
    And a contract with USD currency handling is available
    When the user selects the contract with USD currency
    Then the system displays the operation screen with the total contract value component
    When the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the USD Cash item is visible in the breakdown
    When the user inspects the text color of the USD Cash item
    Then the text color matches the hexadecimal code specified in the Figma Look and Feel