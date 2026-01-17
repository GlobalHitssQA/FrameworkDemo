Feature: Contract Total Value Component Display for Private Banking

  Scenario: Verify total contract value component display for Individual Person contract in Private Banking
    Given the user is authenticated in Acticenter as a Private Banking banker
    When the user selects an Individual Person contract from Private Banking in the contract selector
    Then the system loads the selected contract and displays the operation flow
    And the total contract value component is visible on the screen
    And the total contract value is displayed in Mexican pesos
    And the displayed value corresponds to the total contract value at the review date