Feature: Contract breakdown popup keyboard accessibility

  Scenario: Open and close contract breakdown popup using keyboard navigation
    Given the user is authenticated in Acticenter with an active contract
    When the user navigates to the contract value component using Tab key
    Then the keyboard focus should be visible on the component
    When the user presses Enter key on the focused component
    Then the breakdown popup should be displayed with all applicable contract items
    When the user presses Escape key to close the popup
    Then the breakdown popup should be closed
    When the user presses Enter key on the component again
    Then the breakdown popup should be displayed with the same information