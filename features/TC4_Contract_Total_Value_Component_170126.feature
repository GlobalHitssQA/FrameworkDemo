Feature: Contract Total Value Component for Legal Entity in Private Banking

  Scenario: Verify total contract value component is displayed for Legal Entity contract in Private Banking
    Given I am authenticated in Acticenter as a Private Banking banker user
    When I select a Legal Entity contract from Private Banking in the contract selector
    Then the system loads the selected contract and displays the operation flow
    And the total contract value component is visible with the amount in Mexican pesos
    And the displayed value corresponds to the total contract value on the review date