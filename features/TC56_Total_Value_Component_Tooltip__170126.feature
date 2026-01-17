Feature: Total Value Component Tooltip Display

  Scenario: Verify tooltip appears when hovering over total value component
    Given the user is authenticated in Acticenter with a selected contract
    When the user hovers over the total value component
    Then a descriptive tooltip should be displayed
    And the tooltip text should contain relevant distribution information
    When the user moves the cursor away from the total value component
    Then the tooltip should be hidden