Feature: Contract Value Popup Performance Test

  Scenario: Verify component performance when opening and closing the breakdown popup multiple times
    Given the user is authenticated in Acticenter
    And the user has selected an active contract
    When the user views the total contract value component
    Then the total contract value component should be displayed
    When the user clicks on the total contract value component
    Then the breakdown popup should be displayed with all monetary items
    When the user clicks outside the popup to close it
    Then the popup should be closed
    When the user opens and closes the popup 15 consecutive times
    Then the component should respond correctly without performance degradation
    And no console errors should be present
    And no error messages should be displayed on screen