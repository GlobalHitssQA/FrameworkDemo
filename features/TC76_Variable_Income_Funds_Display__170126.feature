Feature: Variable Income Funds Display Without Investments

  Scenario: Verify variable income funds section shows zero when contract has no investments in this instrument type
    Given a user with advisor or banker role is authenticated
    And a contract without variable income fund investments is available
    When the user selects the contract without variable income fund investments
    Then the contract loads correctly in the system
    When the user clicks on the total contract value component
    Then the popup with the value breakdown is displayed showing all sections
    When the user searches for the Variable Income Funds section in the breakdown list
    Then the Variable Income Funds section appears with value zero
    And the sum of all sections equals the total contract value displayed