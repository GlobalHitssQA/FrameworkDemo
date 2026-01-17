Feature: Debt Funds Display When No Investments Exist

  Scenario: Verify debt funds section shows zero value when contract has no debt fund investments
    Given the user is authenticated in Acticenter
    And there is an active contract without debt fund investments
    When the user selects a contract without debt fund investments
    Then the contract loads and displays on screen
    When the user clicks on the total contract value component
    Then the popup with the complete contract value breakdown is displayed
    And the Debt Funds section shows a value of zero pesos
    When the user clicks outside the breakdown component
    Then the popup closes correctly