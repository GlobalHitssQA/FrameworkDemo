Feature: Contract valuation breakdown - Equity funds section

  Scenario: Verify equity funds section is displayed in contract valuation breakdown
    Given the user is authenticated in Acticenter
    When the user selects a contract with equity fund investments
    And the user clicks on the total contract value component
    Then the valuation breakdown popup is displayed
    And the Equity Funds section is visible with its monetary value