Feature: Contract Total Value Visualization for Legal Entity in Wealth Management

  Scenario: Verify the total contract value component is displayed for a Legal Entity contract
    Given the user is authenticated in Acticenter as a Wealth Management banker
    When the user selects a Legal Entity contract from the contract selector
    Then the system loads the selected contract and displays the operation flow
    And the total contract value component is visible on the screen
    And the total contract value is displayed in Mexican pesos
    And the displayed value corresponds to the current total contract value