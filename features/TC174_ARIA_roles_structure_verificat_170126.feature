Feature: ARIA roles structure verification for contract value component

  Scenario: Verify that the component structure uses correct ARIA roles for semantic interpretation
    Given the user is authenticated in Acticenter with an active contract
    When the user inspects the main contract value component
    Then the main container should have role region with appropriate aria-label
    And the breakdown list should have role list with each item having role listitem
    And the monetary values should have appropriate semantic roles
    And there should be no redundant or conflicting ARIA roles with native HTML elements