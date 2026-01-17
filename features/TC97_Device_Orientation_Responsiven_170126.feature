Feature: Device Orientation Responsiveness for Contract Component

  Scenario: Verify component adapts correctly when changing device orientation from landscape to portrait
    Given the user is authenticated in Acticenter on a mobile device in landscape orientation
    And an active contract is selected
    When the user views the contract value and composition component in landscape
    Then the component should display adapted to horizontal orientation
    When the user clicks on the component to expand the breakdown
    Then the popup should display correctly with all items visible in landscape orientation
    When the user changes the device orientation to portrait
    Then the component and breakdown should reorganize automatically for vertical orientation
    And all elements should be readable and accessible in the new orientation
    And text monetary values and interactive elements should display correctly with appropriate spacing