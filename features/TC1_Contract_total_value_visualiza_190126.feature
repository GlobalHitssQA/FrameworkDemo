Feature: Contract total value visualization for individual customer in Patrimonial Banking

  Scenario: Verify total contract value display for Individual Customer in Patrimonial Banking
    Given the user is authenticated in Acticenter with Patrimonial Banking role
    When the user selects an Individual Customer contract from the contract selector
    Then the system displays the total contract value component
    And the total value is shown in monetary format with peso sign and two decimals
    And the total value component is visible and properly positioned on the funds operation screen