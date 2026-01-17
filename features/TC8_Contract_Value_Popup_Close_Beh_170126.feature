Feature: Contract Value Popup Close Behavior

  Scenario: Verify that the breakdown popup closes when clicking outside the contract value component
    Given the user is authenticated in Acticenter with an active contract selected
    And the contract value component is visible on the screen
    When the user clicks on the contract value component
    Then the breakdown popup is displayed
    When the user clicks outside the popup and the contract value component
    Then the breakdown popup is closed
    And the contract value component remains visible and functional