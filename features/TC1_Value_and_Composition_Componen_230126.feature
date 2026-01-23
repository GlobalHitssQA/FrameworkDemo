Feature: Value and Composition Component Breakdown Popup

  Scenario: Close breakdown popup by clicking outside the component
    Given the user is authenticated in Acticenter with an active contract selected
    When the user clicks on the total value component to display the breakdown
    Then the system displays the popup with the itemized breakdown list
    When the user clicks outside the breakdown component
    Then the system closes the breakdown popup automatically
    And the total value component remains visible in its initial state