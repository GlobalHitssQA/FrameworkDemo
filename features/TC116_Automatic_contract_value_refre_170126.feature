Feature: Automatic contract value refresh without user intervention

  Scenario: Verify that the contract component automatically updates values based on configured refresh frequency
    Given the user is authenticated in Acticenter
    And the user has selected an active contract with multiple investments
    When the user records the initial total value and timestamp
    And the user waits for the configured refresh interval without interaction
    Then the contract component should automatically refresh the values
    And the updated values should be displayed without manual page reload