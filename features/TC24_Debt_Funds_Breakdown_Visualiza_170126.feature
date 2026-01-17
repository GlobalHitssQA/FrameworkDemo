Feature: Debt Funds Breakdown Visualization

  Scenario: Verify the Debt Funds item is displayed with its monetary accumulated value in contract value breakdown
    Given the user is authenticated in Acticenter with an active contract containing debt fund investments
    When the user clicks on the total contract value component
    Then the system displays the breakdown popup with the contract value details
    And the Debt Funds item is visible in the breakdown list
    And the Debt Funds item displays the accumulated monetary value on the right side