Feature: Large monetary values display in contract breakdown

  Scenario: Verify component behavior with very large monetary values exceeding normal limits
    Given the user is authenticated in Acticenter
    And a contract with very large monetary values is available
    When the user selects a contract with values exceeding 999999999.99
    Then the system loads the contract and displays the total value component without errors
    When the user clicks on the component to display the breakdown popup
    Then the popup is displayed showing all contract items
    And the large values are displayed correctly with currency format and thousand separators
    And the value text does not overflow or overlap with other popup elements
    And the total contract value correctly calculates and displays the sum of all items including large values