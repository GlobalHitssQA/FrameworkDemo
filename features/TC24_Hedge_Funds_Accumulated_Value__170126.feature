Feature: Hedge Funds Accumulated Value Verification

  Scenario: Verify hedge funds section displays correct accumulated monetary value in pesos
    Given the user is authenticated in Acticenter
    And the user selects a contract with hedge fund investments
    Then the total contract value component is displayed
    When the user retrieves the expected hedge funds value from backend service
    And the user clicks on the contract value component to expand breakdown
    Then the breakdown popup is displayed
    When the user locates the hedge funds section in the breakdown list
    Then the hedge funds section is visible
    And the displayed hedge funds amount matches the expected backend value with correct thousand separators and decimal format