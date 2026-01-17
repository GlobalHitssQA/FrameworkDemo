Feature: Contract Value Component Updates
  As an advisor or banker user
  I want to see updated values when selecting different contracts
  So that I can view accurate information for each contract

  Scenario: Verify component values update correctly when switching between contracts
    Given the user is authenticated in Acticenter with valid advisor credentials
    When the user selects the first contract of Persona Fisica Casa de Bolsa
    Then the Value and Composition component displays data for the selected contract
    And the user records the displayed values including Total Value and Purchase Power and Pending Settlement and Funds
    When the user selects a second different contract of Persona Moral Banco
    Then the Value and Composition component updates with new values for the second contract
    And the displayed values are different from the previously recorded values
    When the user switches back to the first contract
    Then the system restores the original values from the first contract