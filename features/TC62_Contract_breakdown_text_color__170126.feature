Feature: Contract breakdown text color verification
  As a user of Acticenter
  I want to verify the text color of the Purchasing Power item in the contract breakdown
  So that I can ensure it complies with Look & Feel specifications

  Scenario: Verify the text color of Purchasing Power MXN item in contract breakdown
    Given the user is authenticated in Acticenter
    And the user has access to a Casa de Bolsa contract
    When the user accesses Acticenter and selects a Casa de Bolsa contract
    Then the system displays the operation screen with the total contract value component
    When the user clicks on the total contract value component to expand the breakdown
    Then the system displays a popup with the contract value breakdown including Purchasing Power MXN item
    When the user inspects the text color of the Purchasing Power MXN item
    Then the text color matches the hexadecimal code specified in Figma Look and Feel
    And the Purchasing Power MXN text color complies exactly with the design specifications