Feature: Contract Value Breakdown Closure in Responsive Portrait View

  Scenario: Close contract value breakdown popup by clicking outside in Responsive Portrait view
    Given the user is authenticated in Acticenter with a valid contract selected
    And the device is configured in Responsive Portrait resolution
    When the user clicks on the total contract value component to display the breakdown
    Then the system displays the popup with the total contract value breakdown
    When the user clicks outside the breakdown popup
    Then the breakdown popup closes and only the total contract value component is displayed