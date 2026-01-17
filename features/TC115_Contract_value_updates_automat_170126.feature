Feature: Contract value updates automatically after fund sale operation

  Scenario: Verify component updates total value and breakdown after selling variable income funds
    Given the user is authenticated and has access to Acticenter
    And the user selects a contract with fund investments
    And the system displays the component with the current total contract value
    When the user records the initial total value and funds balance
    And the user executes a variable income fund sale operation for a specific amount
    And the system confirms the sale transaction successfully
    And the user waits for the automatic component refresh interval
    Then the variable income funds section should show a decreased value
    And the purchasing power should show a proportionally increased value
    And the values should update without requiring a page reload