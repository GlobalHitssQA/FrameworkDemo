Feature: Pop-up breakdown viewport positioning
  As a user viewing contract values in Acticenter
  I want the breakdown pop-up to stay within visible screen bounds
  So that I can view all content without horizontal scrolling

  Scenario: Verify breakdown pop-up positions correctly within viewport boundaries
    Given the user is authenticated and has an active contract selected
    When the user positions the total value component near the right edge of the screen
    Then the total value component should be displayed correctly
    When the user clicks on the total value component to open the breakdown pop-up
    Then the pop-up should adjust automatically to stay within visible screen bounds
    And the pop-up content should be fully visible without horizontal scroll
    When the user positions the total value component near the bottom edge of the screen
    And the user clicks on the total value component to open the breakdown pop-up
    Then the pop-up should adjust vertically to remain completely visible
    When the user clicks outside the pop-up
    Then the pop-up should close correctly