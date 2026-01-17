Feature: Contract Capital Market Breakdown Visualization
  As an authenticated user in Acticenter
  I want to view the Capital Market section in the contract value breakdown
  So that I can see the accumulated monetary value of capital market investments

  Scenario: Verify Capital Market section displays accumulated monetary value in contract breakdown
    Given the user is authenticated in Acticenter
    And the user has selected a contract with capital market investments
    When the user clicks on the total contract value component
    Then the contract value breakdown popup is displayed
    And the Capital Market section is visible in the breakdown list
    And the Capital Market section displays the accumulated monetary value on the right side