Feature: Contract breakdown pending settlement text color verification

  Scenario: Verify the text color of Pending Settlement item in contract breakdown
    Given the user is authenticated in Acticenter
    And a contract is available for consultation
    When the user accesses Acticenter and selects a contract
    Then the system displays the operation screen with the total contract value component
    When the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown including Pending Settlement item
    When the user inspects the text color of the Pending Settlement item
    Then the text color matches the hexadecimal code specified in the Figma Look and Feel
    And the Pending Settlement text color complies exactly with the design specifications