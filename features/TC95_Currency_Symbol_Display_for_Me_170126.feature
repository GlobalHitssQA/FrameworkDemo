Feature: Currency Symbol Display for Mexican Peso Values

  Scenario: Verify MXN values display correct peso currency symbol
    Given the user is authenticated in Acticenter
    And the user has a contract with values in Mexican pesos
    When the user selects a contract containing MXN values
    Then the system loads the contract and displays the total value component
    When the user clicks on the total value component to expand the breakdown
    Then the popup displays all applicable contract items
    And all MXN values display the dollar sign symbol before the amount
    And the currency symbol is consistent across all peso-denominated items