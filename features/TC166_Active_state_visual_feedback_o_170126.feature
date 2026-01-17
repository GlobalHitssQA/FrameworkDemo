Feature: Active state visual feedback on interactive component

  Scenario: Verify interactive component displays active state during click interaction
    Given the user is authenticated in Acticenter
    And the user has selected an active contract
    And the contract value and composition component is visible
    When the user presses and holds the mouse button on the main component
    Then the component should display the active visual state with style changes
    When the user observes the active state before releasing the click
    Then the active state should be visually distinct from hover and normal states
    When the user releases the click
    Then the breakdown popup should open correctly
    And the component visual state should return to normal or hover state