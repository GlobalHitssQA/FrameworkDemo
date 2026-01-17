Feature: Contract value component orientation responsiveness
  As an authenticated user on a mobile device
  I want the contract value component to adapt when changing device orientation
  So that I can view the information correctly in both portrait and landscape modes

  Scenario: Component adapts correctly when changing device orientation from portrait to landscape
    Given the user is authenticated in Acticenter on a mobile device in portrait orientation
    And an active contract is selected
    When the user views the contract value and composition component
    Then the component should be displayed adapted to portrait orientation
    When the user clicks on the component to expand the breakdown
    Then the popup should display correctly with the list of items in portrait orientation
    When the user changes the device orientation to landscape
    Then the component and breakdown should reorganize automatically for horizontal space
    And the breakdown should remain vertically aligned with the total value component