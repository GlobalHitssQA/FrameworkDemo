Feature: Popup overlay z-index verification

  Scenario: Verify that the breakdown popup displays above all other interface components with appropriate z-index
    Given the user is authenticated and viewing a contract with multiple visible components in Acticenter
    When the user clicks on the total value component to display the breakdown popup
    Then the popup should display correctly overlaying other interface elements
    And the elements behind the popup should not respond to clicks while the popup is open
    When the user clicks outside the popup to close it
    Then the popup should close and all other components should become interactive again