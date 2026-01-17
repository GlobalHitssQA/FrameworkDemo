Feature: Close breakdown popup on touch device by tapping outside

  Scenario: User closes the breakdown popup by tapping outside the component on a touch device
    Given the user is authenticated in Acticenter on a touch device with an active contract selected
    And the contract total value component is displayed
    When the user taps on the total value component
    Then the breakdown popup is displayed with contract value details
    When the user taps outside the breakdown popup
    Then the breakdown popup is closed
    And the total value component remains visible without alterations