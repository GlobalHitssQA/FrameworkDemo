Feature: Contract breakdown performance validation

  Scenario: Verify component performance with multiple consecutive open and close operations of contract breakdown
    Given the user is authenticated in Acticenter
    And a contract with values in multiple categories is selected
    When the user clicks on the contract value component to display the breakdown
    Then the breakdown popup should be displayed smoothly
    When the user closes the breakdown by clicking outside the component
    Then the popup should close correctly
    When the user repeats opening and closing the breakdown 20 consecutive times
    Then the component should open and close consistently without performance degradation
    And each operation response time should remain under 2 seconds