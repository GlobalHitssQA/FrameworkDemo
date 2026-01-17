Feature: Contract Value Breakdown - Variable Income Funds Visualization

  Scenario: Verify variable income funds item display with monetary accumulated value in contract breakdown
    Given the user is authenticated in Acticenter
    And the user has selected a contract with variable income fund investments
    When the user clicks on the total contract value component
    Then the system displays the popup with the contract value breakdown
    When the user locates the variable income funds item in the breakdown list
    Then the system displays the variable income funds item in the list
    And the accumulated monetary value for variable income fund investments is displayed on the right side