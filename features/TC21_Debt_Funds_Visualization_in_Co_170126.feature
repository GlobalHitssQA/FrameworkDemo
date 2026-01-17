Feature: Debt Funds Visualization in Contract Valuation Breakdown

  Scenario: Verify the Debt Funds section is displayed in the contract valuation breakdown
    Given the user is authenticated in Acticenter
    When the user selects a contract with debt fund investments
    And the user clicks on the total contract value component
    Then the breakdown popup is displayed
    And the Debt Funds section is visible with its monetary value