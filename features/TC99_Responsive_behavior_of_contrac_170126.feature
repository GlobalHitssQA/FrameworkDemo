Feature: Responsive behavior of contract value and composition component

  Scenario: Verify that the value and composition component adapts correctly to different screen resolutions while maintaining functionality and legibility
    Given the user is authenticated in Acticenter with an active contract
    When the user accesses Acticenter from a desktop resolution of 1920x1080
    Then the component should display with the complete desktop design
    When the user accesses from a tablet resolution of 768x1024
    Then the component should adapt to tablet size with all elements visible and functional
    When the user accesses from a mobile resolution of 375x667
    Then the component should adapt to mobile size with appropriate responsive adjustments
    And the user expands the breakdown section at each resolution
    Then the breakdown list should be legible and navigable with functional scroll if needed
    And the monetary values should maintain correct format with thousands separators and currency symbols at all resolutions