Feature: Contract Value Component Spacing and Alignment Verification

  Scenario: Verify internal spacing, margins and alignment of contract value component match design specifications
    Given the user is authenticated and has a contract selected
    And the contract value and composition component is displayed
    When the user inspects the internal spacing between component elements
    Then the padding of the total value container should match design specifications
    And the margin between breakdown items should be consistent
    And the breakdown list should be vertically aligned with the total value component
    And all spacing values should comply with the design system standards