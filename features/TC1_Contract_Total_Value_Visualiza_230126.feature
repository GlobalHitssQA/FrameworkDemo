Feature: Contract Total Value Visualization

  Scenario: User views the total contract value component
    Given the user is on the OTA-ACTICENTER main page
    When the user navigates to the contract section
    Then the total contract value component should be visible
    And the contract value should display a valid amount