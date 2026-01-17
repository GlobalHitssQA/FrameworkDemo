Feature: Contract Value Breakdown - Capital Market Accumulated Calculation

  Scenario: Verify capital market accumulated monetary value in contract value breakdown
    Given the user is authenticated in Acticenter with valid credentials
    When the user selects a contract containing capital market investments
    And the user clicks on the total contract value component
    Then the system displays the breakdown popup with contract value details
    And the Capital Market section shows the correct accumulated monetary value aligned to the right