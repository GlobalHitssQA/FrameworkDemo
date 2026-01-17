Feature: Popup Breakdown Close Animation
  As a user with an active contract
  I want to see smooth close animations on the breakdown popup
  So that the interface feels polished and professional

  Background:
    Given the user is authenticated in Acticenter
    And an active contract is available

  Scenario: Verify popup breakdown has smooth close animation according to Look and Feel specifications
    Given the user is on the Acticenter main page
    When the user clicks on the total contract value component
    Then the breakdown popup should be displayed showing the breakdown items
    When the user clicks outside the popup component
    Then the popup should close with a smooth animation without visual jumps
    When the user clicks on the total contract value component again
    And the user presses the Escape key
    Then the popup should close with the same smooth animation
    When the user opens and closes the popup multiple times using different methods
    Then the close animation should be consistent across all executions with uniform duration and effect