Feature: Transit Cash Display Based on Contract Type
  As a user of Acticenter
  I want to see the Transit Cash item only for Bank contracts
  So that I can verify the correct breakdown items are displayed per contract type

  Scenario: Verify Transit Cash is displayed for Bank contracts but not for Brokerage House contracts
    Given the user is authenticated in Acticenter
    When the user selects a Bank contract
    And the user clicks on the total contract value component
    Then the breakdown popup should be displayed
    And the Transit Cash item should be visible in the breakdown
    When the user selects a Brokerage House contract
    And the user clicks on the total contract value component
    Then the breakdown popup should be displayed
    And the Transit Cash item should not be visible in the breakdown