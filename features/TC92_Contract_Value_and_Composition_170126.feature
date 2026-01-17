Feature: Contract Value and Composition Component Visual Design Verification
  As a user of Acticenter
  I want to verify that the contract value and composition component follows the Look & Feel design
  So that the application maintains visual consistency

  Background:
    Given the user is authenticated in the system
    And a contract is selected

  Scenario: Verify contract value component complies with Look and Feel specifications
    When the user accesses the contract value and composition component
    Then the component should be displayed correctly on the screen
    And the general design should match the Look and Feel specifications
    And the visual elements like buttons and icons should align with the approved design
    And the component should maintain visual consistency with other Acticenter components