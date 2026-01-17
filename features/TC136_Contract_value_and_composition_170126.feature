Feature: Contract value and composition component tablet responsiveness

  Scenario: Verify contract value and composition component displays correctly in portrait and landscape orientations on tablet
    Given the user is authenticated in Acticenter on a tablet device
    When the user selects a registered contract in portrait orientation
    Then the contract value and composition component is displayed adapted to portrait orientation
    When the user taps on the contract value component to expand the breakdown
    Then the breakdown popup is displayed showing all corresponding items
    When the user closes the breakdown popup and rotates to landscape orientation
    Then the component adapts correctly to landscape orientation
    When the user taps on the contract value component again to expand the breakdown
    Then the breakdown popup is displayed adapted to landscape orientation with vertical alignment