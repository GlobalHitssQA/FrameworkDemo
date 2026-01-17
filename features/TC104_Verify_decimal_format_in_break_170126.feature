Feature: Verify decimal format in breakdown amounts

  Scenario: Amounts in the breakdown display correct decimal format
    Given the user is authenticated in Acticenter
    And there is a contract with monetary values containing decimals
    When the user selects a contract with decimal monetary values
    Then the system loads the selected contract
    When the user clicks on the total value component to display the breakdown
    Then the system displays the popup with the breakdown of items
    And all amounts are displayed with two decimals in format $X,XXX.XX
    And the displayed values match the system values with correct rounding to two decimals