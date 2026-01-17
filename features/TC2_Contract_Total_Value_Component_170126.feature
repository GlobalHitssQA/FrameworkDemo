Feature: Contract Total Value Component for Legal Entity

  Scenario: Verify total contract value component display for Legal Entity in Patrimonial Banking
    Given the user is authenticated in Acticenter as a Patrimonial Banking advisor
    When the user selects a Legal Entity contract from Patrimonial Banking in the contract selector
    Then the system loads the selected contract and displays the operation flow
    And the total contract value component is visible on the screen
    And the total contract value component displays the amount in Mexican pesos
    And the displayed value corresponds to the total contract value on the review date