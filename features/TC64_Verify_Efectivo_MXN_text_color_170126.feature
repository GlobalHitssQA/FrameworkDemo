Feature: Verify Efectivo MXN text color in contract breakdown

  Scenario: Validate the text color of Efectivo MXN field matches Figma specifications
    Given the user is authenticated in Acticenter
    And a Bank contract is available for consultation
    When the user selects a Bank contract
    Then the system displays the operation screen with the total contract value component
    When the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the breakdown includes the Efectivo MXN field
    When the user inspects the text color of Efectivo MXN field
    Then the text color matches the hexadecimal code specified in Figma Look and Feel
    And the Efectivo MXN text color complies exactly with the design specifications