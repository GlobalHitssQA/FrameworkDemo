Feature: Wealth Management Contract Total Value Component
  As a Wealth Management banker
  I want to view the total contract value component
  So that I can see the total value for a Physical Person contract

  Scenario: Verify total contract value component display for Physical Person contract
    Given I am authenticated in Acticenter as a Wealth Management banker
    When I select a Physical Person contract from Wealth Management
    Then I should see the contract operation flow loaded
    And I should see the total contract value component
    And the total contract value should be displayed in Mexican pesos
    And the total contract value should be correctly updated for the review date