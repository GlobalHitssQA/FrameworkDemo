Feature: Verify design specifications compliance for contract value component

  Scenario: Colors and typography match Figma design specifications
    Given the user is authenticated in the system
    And a contract is selected
    When the user opens the contract value and composition component in Acticenter
    Then the component should be displayed correctly
    When the user inspects the text colors in the component
    Then the text colors should match Figma specifications
    When the user inspects the background colors in the component
    Then the background colors should match Figma specifications
    When the user inspects the border and icon colors in the component
    Then the border and icon colors should match Figma specifications
    When the user inspects the typography properties in the component
    Then the font family should match Figma specifications
    And the font sizes should match Figma specifications
    And the font weights should match Figma specifications
    And the font styles should match Figma specifications
    When the user documents any discrepancies found
    Then all differences should be properly recorded