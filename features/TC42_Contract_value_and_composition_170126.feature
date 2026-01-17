Feature: Contract value and composition component for Corporate Person in Patrimonial Banking

  Scenario: Display and verify contract value and composition component for Corporate Person
    Given the user is authenticated in Acticenter with Patrimonial Banking profile
    When the user selects a Corporate Person contract from Patrimonial Banking
    Then the contract value and composition component is displayed
    And the total contract value is shown with the review date
    When the user clicks on the component to expand the breakdown
    Then a popup is displayed with the detailed breakdown for PA PM contract
    And the MXN Cash section is displayed with the bank account balance
    And the USD Cash section is displayed if the contract has a related Mexdolar account