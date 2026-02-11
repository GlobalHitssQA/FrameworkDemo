Feature: Value and Composition Component Popup Interaction

  Scenario: User opens and closes the value composition popup by clicking inside and outside the component
    Given the user is authenticated in Acticenter with an active contract selected
    And the value and composition component is visible in its initial closed state
    When the user clicks on the value and composition component
    Then the system displays the popup with the detailed contract composition breakdown
    When the user interacts within the popup
    Then the popup remains open and all breakdown items are visible
    When the user clicks outside the composition component
    Then the system closes the popup and returns to the initial component state
    When the user clicks on the value and composition component again
    Then the system displays the popup with the updated composition breakdown