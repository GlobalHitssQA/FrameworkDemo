Feature: Mobile responsive component for value and composition display

  Scenario: Verify value and composition component works correctly on mobile devices in both orientations
    Given the user is authenticated and has a contract selected
    When the user accesses the component on a mobile device in portrait orientation
    Then the component should be displayed correctly adapted to vertical mobile screen
    And the component elements should be reorganized appropriately for small screens without horizontal scroll
    When the user rotates the device to landscape orientation
    Then the component should automatically adapt to horizontal orientation
    When the user opens the breakdown popup in portrait orientation
    Then the popup should be displayed correctly within the screen bounds
    When the user opens the breakdown popup in landscape orientation
    Then the popup should adjust to mobile screen size in landscape orientation
    And the user should be able to open the popup by tapping the component
    And the user should be able to close the popup by tapping outside of it