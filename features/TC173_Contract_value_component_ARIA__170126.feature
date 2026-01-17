Feature: Contract value component ARIA accessibility validation

  Scenario: Verify interactive elements have descriptive ARIA labels
    Given the user is authenticated in Acticenter with an active contract
    When the user inspects the contract value and composition component
    Then the component source code should be accessible via browser developer tools
    And the dropdown button should have a descriptive aria-label or aria-labelledby attribute
    And the breakdown popup should have role dialog and aria-modal true attributes
    And each breakdown item should have aria-describedby linking to its monetary value
    And the popup close button should have a descriptive aria-label