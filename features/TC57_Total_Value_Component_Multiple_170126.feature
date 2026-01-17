Feature: Total Value Component Multiple Clicks Response

  Scenario: Verify total value component responds correctly to multiple consecutive clicks
    Given the user is authenticated in Acticenter
    And a contract with breakdown items is selected
    When the user clicks on the total value component
    Then the system displays the breakdown popup with contract items
    When the user clicks outside the popup to close it
    Then the breakdown popup is closed
    When the user clicks on the total value component again
    Then the system displays the breakdown popup with contract items
    When the user opens and closes the popup multiple times consecutively
    Then the system responds correctly opening and closing the popup without errors