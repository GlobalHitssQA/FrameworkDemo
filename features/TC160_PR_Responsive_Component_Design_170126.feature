Feature: PR Responsive Component Design Compliance
  As a Private Banking user
  I want the contract value and composition component to comply with Figma specifications
  So that I have a consistent mobile experience

  Scenario: Verify PR Responsive component meets Figma design specifications on mobile devices
    Given I have access to the PR Responsive application
    When I view the component in landscape mode
    Then the component should adapt correctly to horizontal orientation
    When I view the component in portrait mode
    Then the component should adapt correctly to vertical orientation
    And the header with client and contract search should display correctly
    When I open the breakdown popup
    And I tap outside the popup component
    Then the popup should close correctly
    And all breakdown items should be visible and legible in both orientations