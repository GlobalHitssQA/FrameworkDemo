Feature: Contract value and composition component on iOS devices

  Scenario: Verify contract value component functionality and breakdown display on iOS device
    Given the user opens the Acticenter application on an iOS device
    When the user selects a previously registered contract
    Then the contract value and composition component is displayed with responsive design
    When the user taps on the component to expand the contract value breakdown
    Then the popup displays all corresponding breakdown items adapted to the device screen
    When the user verifies the search magnifying glass functionality
    Then the general client screen is displayed allowing contract selection
    When the user taps outside the expanded component
    Then the popup closes correctly