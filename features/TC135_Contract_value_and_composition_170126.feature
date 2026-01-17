Feature: Contract value and composition component on Android devices

  Scenario: Verify contract value component and breakdown display on Android device
    Given the user is authenticated and opens Acticenter application on Android device
    When the user selects a previously registered contract
    Then the contract value and composition component is displayed with responsive design
    When the user taps on the component to display the value breakdown
    Then the popup displays all breakdown items adapted to the device screen
    When the user taps on the search magnifying glass icon
    Then the general client screen is displayed allowing contract selection
    When the user taps outside the expanded component
    Then the popup closes correctly