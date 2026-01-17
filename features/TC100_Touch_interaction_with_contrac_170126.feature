Feature: Touch interaction with contract value component on mobile devices

  Scenario: Verify touch gestures work correctly on mobile for opening and closing breakdown popup
    Given the user is authenticated and has a contract selected on a mobile device
    When the user taps on the total contract value component
    Then the breakdown popup should be displayed correctly
    When the user taps outside the breakdown popup area
    Then the breakdown popup should close automatically
    And the component should respond to single touch without requiring multiple taps
    And the touch target area should be large enough for comfortable mobile interaction