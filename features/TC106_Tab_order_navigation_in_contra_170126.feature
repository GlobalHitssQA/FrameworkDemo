Feature: Tab order navigation in contract breakdown popup

  Scenario: Verify tab order follows logical top-to-bottom sequence in breakdown popup
    Given the user is authenticated in Acticenter
    And the user has selected a contract with multiple items
    When the user clicks on the contract value component to open the breakdown popup
    Then the breakdown popup should be displayed with all applicable items
    When the user presses Tab key repeatedly to navigate through breakdown elements
    Then the focus should move in sequential order from top to bottom following the expected order
    And the tab order should remain consistent when reopening the popup multiple times