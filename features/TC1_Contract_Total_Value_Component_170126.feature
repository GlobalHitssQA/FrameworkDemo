Feature: Contract Total Value Component Visualization
  As a Patrimonial Banking advisor
  I want to visualize the total contract value component
  So that I can see the contract value for a Physical Person

  Scenario: Verify total contract value component display for Physical Person contract
    Given I am authenticated in Acticenter as a Patrimonial Banking advisor
    When I select a Physical Person contract from Patrimonial Banking
    Then I should see the total contract value component on the screen
    And the total contract value should be displayed in Mexican pesos
    And the displayed value should correspond to the current contract total value