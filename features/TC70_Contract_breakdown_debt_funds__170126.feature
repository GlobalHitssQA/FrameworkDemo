Feature: Contract breakdown debt funds text color verification

  Scenario: Verify the text color of Debt Funds item in the contract breakdown
    Given the user is authenticated in Acticenter
    And a contract with debt fund investments is available
    When the user selects a contract with debt fund investments
    Then the system displays the operation screen with the total contract value component
    When the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown including Debt Funds item
    When the user inspects the text color of the Debt Funds item
    Then the text color matches the hexadecimal code specified in Figma Look and Feel
    And the Debt Funds item text color complies exactly with the design specifications