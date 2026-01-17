Feature: Capital Market Text Color Look and Feel Verification

  Scenario: Verify that Capital Market section text color meets Look and Feel specifications
    Given the user is authenticated in the Acticenter module
    When the user selects a contract with capital market investments
    And the user clicks on the total contract value component
    Then the contract value breakdown popup is displayed
    And the Capital Market text color meets the Look and Feel specifications