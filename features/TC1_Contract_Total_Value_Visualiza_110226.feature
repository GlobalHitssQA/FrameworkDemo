Feature: Contract Total Value Visualization

  Scenario: User views the total contract value component
    Given the user is on the main dashboard page
    When the user views the contract total value component
    Then the total contract value should be displayed
    And the value should be formatted as currency