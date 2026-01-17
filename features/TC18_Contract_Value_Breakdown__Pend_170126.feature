Feature: Contract Value Breakdown - Pending Settlement Display

  Scenario: Verify that Pending Settlement item is displayed correctly in contract value breakdown
    Given the user is authenticated and on the Acticenter main screen
    When the user selects a contract with pending settlement operations
    And the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the Pending Settlement item is visible in the breakdown
    And the Pending Settlement value reflects the total amount of pending operations