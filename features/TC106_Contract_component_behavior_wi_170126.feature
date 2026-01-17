Feature: Contract component behavior with extremely large monetary values

  Scenario: Verify component displays extremely large monetary values correctly without truncation
    Given the user is authenticated in Acticenter
    And a contract with extremely large monetary values is available
    When the user selects a contract with extremely high monetary values
    Then the system loads the selected contract
    When the user clicks on the total value component to display the breakdown
    Then the system displays the popup with the breakdown of items
    And the large values are displayed completely without truncation
    And the amounts show correct thousand separators in format $X,XXX,XXX.XX
    And the popup maintains its correct visual structure without text overflow
    And the total contract value correctly shows the sum of all items including large values