Feature: Close breakdown popup using Escape key

  Scenario: User closes the breakdown popup by pressing Escape key
    Given the user is authenticated and viewing an active contract in Acticenter
    When the user clicks on the contract value component
    Then the breakdown popup should be displayed with the list of items
    When the user presses the Escape key
    Then the breakdown popup should close immediately
    And the focus should return to the main contract component