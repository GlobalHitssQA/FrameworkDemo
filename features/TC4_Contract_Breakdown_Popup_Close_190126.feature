Feature: Contract Breakdown Popup Close Behavior

  Scenario: Verify popup closes when clicking outside and stays open when clicking inside
    Given the user is authenticated in Acticenter
    And an active contract is selected and the total value component is displayed
    When the user clicks on the total value component
    Then the breakdown popup is displayed with contract composition details
    When the user clicks outside the popup and component area
    Then the breakdown popup is closed and only the total value component is visible
    When the user clicks on the total value component again
    And the user clicks inside the popup area
    Then the breakdown popup remains open