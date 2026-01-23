Feature: Close breakdown popup by clicking outside

  Scenario: User closes the contract value breakdown popup by clicking outside
    Given the user is authenticated and has an active contract selected in Acticenter
    When the user clicks on the total value component to display the breakdown
    Then the breakdown popup with the itemized list should be displayed
    When the user clicks outside the breakdown component
    Then the breakdown popup should close automatically
    And the total value component should remain visible in its initial state