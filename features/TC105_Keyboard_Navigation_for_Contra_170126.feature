Feature: Keyboard Navigation for Contract Value Component

  Scenario: Complete navigation of contract value component using only keyboard
    Given the user is authenticated in Acticenter with an active contract
    When the user navigates to the contract value component using Tab key
    Then the keyboard focus should be positioned on the component and visually identifiable
    When the user presses Enter key on the component
    Then the breakdown popup should be displayed correctly
    When the user navigates through popup elements using Tab key
    Then the focus should move sequentially through all breakdown items and remain visible
    When the user presses Escape key to close the popup
    Then the popup should close and focus should return to the main component
    And all interactive elements should be accessible without using the mouse