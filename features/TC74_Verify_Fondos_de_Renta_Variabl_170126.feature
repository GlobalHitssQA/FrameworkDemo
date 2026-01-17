Feature: Verify Fondos de Renta Variable text color meets Look and Feel specifications

  Scenario: Validate text color of Fondos de Renta Variable item in contract breakdown
    Given the user is authenticated and on the Acticenter main screen
    When the user selects a contract with variable income fund investments
    And the user clicks on the total contract value component
    Then the contract value breakdown popup is displayed
    And the text color of Fondos de Renta Variable item meets the Look and Feel specifications