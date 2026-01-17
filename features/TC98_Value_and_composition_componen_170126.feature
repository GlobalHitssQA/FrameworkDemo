Feature: Value and composition component tablet responsiveness

  Scenario: Verify value and composition component displays and functions correctly on tablet in both orientations
    Given the user is authenticated and has a contract selected on a tablet device
    When the user views the component in landscape orientation
    Then the component should be correctly adapted to horizontal orientation
    And all component elements should be visible and accessible
    When the user rotates the device to portrait orientation
    Then the component should automatically adapt to vertical orientation
    And the breakdown popup should function correctly in both orientations
    And the client contract search functionality should be available and working