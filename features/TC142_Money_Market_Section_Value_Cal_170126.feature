Feature: Money Market Section Value Calculation in Contract Breakdown

  Scenario: Verify the accumulated monetary value calculation for Money Market section in contract value breakdown
    Given the user is authenticated in Acticenter with valid credentials
    When the user selects a contract that contains money market investments
    And the user clicks on the total value component to display the breakdown
    Then the Money Market section should display the correct accumulated monetary value on the right side