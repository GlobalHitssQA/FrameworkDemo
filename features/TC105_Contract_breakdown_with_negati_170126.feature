Feature: Contract breakdown with negative amounts

  Scenario: Verify system behavior when contract has negative amounts in breakdown items
    Given the user is authenticated in Acticenter
    And a contract with negative values in at least one item is available
    When the user selects the contract with negative values
    And the user clicks on the total contract value component
    Then the system displays the popup with the breakdown of items
    And the negative amounts are displayed with minus sign before currency symbol in format -$X,XXX.XX
    And the total contract value correctly reflects the algebraic sum including negative amounts