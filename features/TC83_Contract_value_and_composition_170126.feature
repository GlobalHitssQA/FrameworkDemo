Feature: Contract value and composition component accessibility

  Scenario: Verify contract value component is accessible with screen reader technology
    Given the user has a screen reader activated and configured
    And the user is authenticated in Acticenter with an active contract
    When the user navigates to the contract total value component
    Then the screen reader announces the component with appropriate descriptive labels
    When the user activates the component to open the breakdown popup
    Then the popup opens and the screen reader announces the breakdown items with their values
    When the user navigates through each breakdown item using the screen reader
    Then the screen reader correctly announces each item including purchasing power and cash and pending settlements and funds with their monetary values
    When the user closes the popup using screen reader commands
    Then the screen reader announces the popup closure and focus returns to the main component