Feature: Contract breakdown with negative values

  Scenario: Verify component behavior when a category shows negative values in the contract breakdown
    Given the user is authenticated in Acticenter
    And a contract with negative value categories is available
    When the user selects a contract with negative value categories
    Then the system loads the selected contract and displays the total value component
    When the user clicks on the total contract value component
    Then the breakdown popup is displayed showing all applicable categories
    And the categories with negative values are displayed correctly with minus sign and proper monetary format
    And the total contract value reflects the correct algebraic sum including negative values