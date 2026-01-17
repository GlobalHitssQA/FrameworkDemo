Feature: Contract Value Breakdown - Variable Income Funds Label

  Scenario: Verify the Variable Income Funds label in the contract value breakdown matches Look & Feel specifications
    Given the user is authenticated in the Acticenter module
    When the user selects a contract with variable income fund investments
    And the user clicks on the total contract value component
    Then the breakdown popup should be displayed
    And the item "Fondos de renta variable" should be visible in the breakdown list with correct Look & Feel