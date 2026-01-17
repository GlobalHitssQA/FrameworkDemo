Feature: Contract component color contrast accessibility verification

  Scenario: Verify that the contract component color contrast meets WCAG accessibility standards
    Given the user is authenticated in Acticenter
    And the user has an active contract selected
    When the user views the contract value and composition component
    Then the main component text should have a contrast ratio of at least 4.5:1 with its background
    When the user opens the breakdown popup
    Then all section titles should have sufficient contrast with the background
    And all monetary values should have sufficient contrast with the background
    When the user hovers over a section item
    Then the hover state should maintain WCAG AA contrast standards
    When the user selects a section item
    Then the selected state should maintain WCAG AA contrast standards