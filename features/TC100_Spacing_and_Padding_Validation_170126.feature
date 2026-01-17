Feature: Spacing and Padding Validation of Contract Value Component

  Scenario: Verify internal and external spacing of component and breakdown match Figma design specifications
    Given the user is authenticated in Acticenter
    And an active contract is selected
    When the user views the contract value component
    Then the component external margins should match Figma design specifications
    When the user opens the breakdown popup
    Then the internal padding of each item in the breakdown list should match Figma specifications
    And the separation between breakdown items should match Figma specifications
    And the breakdown should be vertically aligned with the main component