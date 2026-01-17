Feature: Contract valuation breakdown - Hedge funds visualization

  Scenario: Verify hedge funds section is displayed in contract valuation breakdown
    Given the user is authenticated in Acticenter
    When the user selects a contract with hedge fund investments
    And the user clicks on the total contract value component
    Then the valuation breakdown popup is displayed
    And the hedge funds section is visible with its monetary value