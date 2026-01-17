Feature: PA Desktop Value and Composition Component Design Compliance

  Scenario: Verify that the PA Desktop component matches Figma design specifications
    Given the user has access to the PA Desktop application
    And the value and composition component is loaded
    When the user inspects the total value component
    Then the total value component should match the Figma design specifications
    When the user clicks on the total value component to open the breakdown popup
    Then the breakdown popup should be visible
    And the popup should match Figma specifications for position size and alignment
    And the visual elements should comply with the PA Desktop style guide
    And the breakdown items should be displayed in the correct order
    And the items should include Poder de compra and Pendientes por liquidar and Fondos and Cedes and Mercados
    When the user documents any design deviations
    Then a deviation report should be generated if differences are found