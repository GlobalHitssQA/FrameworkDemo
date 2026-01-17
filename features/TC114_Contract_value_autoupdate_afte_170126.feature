Feature: Contract value auto-update after fund purchase operation

  Scenario: Verify that the component automatically updates total value and breakdown after executing a fund purchase operation
    Given the user is authenticated and accesses Acticenter
    And the user selects a contract with available purchasing power
    And the system displays the component with the current total contract value
    When the user records the total contract value and breakdown values
    And the user executes a debt fund purchase operation for a specific amount
    And the system successfully processes the purchase operation
    And the user waits for the specified refresh interval
    Then the component updates automatically without page reload
    And the total value increases correctly
    And the breakdown shows the new balance in the Debt Funds section