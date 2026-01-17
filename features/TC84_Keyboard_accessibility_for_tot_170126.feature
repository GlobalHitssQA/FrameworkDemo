Feature: Keyboard accessibility for total value component and breakdown popup

  Scenario: Navigate total value component and breakdown popup using only keyboard
    Given the user is authenticated in Acticenter with a selected contract
    When the user navigates to the total value component using Tab key
    Then the focus should be positioned on the total value component
    When the user presses Enter or Space to open the breakdown popup
    Then the breakdown popup should be displayed showing the breakdown items
    When the user navigates through breakdown items using Tab and Shift+Tab
    Then the focus should move sequentially through each breakdown item in order
    When the user presses Escape key to close the popup
    Then the popup should close and focus should return to the total value component
    And all interactive elements should have a visible focus indicator