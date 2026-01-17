Feature: Contract breakdown display with small monetary values

  Scenario: Verify small monetary values are displayed correctly in contract breakdown
    Given the user is authenticated in Acticenter
    And a contract with small monetary values close to zero is available
    When the user selects the contract with small monetary values
    Then the system loads the selected contract
    When the user clicks on the total value component to display the breakdown
    Then the system displays the popup with the breakdown of items
    And the small values are displayed correctly with two decimal format
    And values greater than zero are not rounded to zero
    And the total value correctly reflects the small monetary values in the sum