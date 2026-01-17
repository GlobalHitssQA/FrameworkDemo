Feature: Contract Total Value Component Update
  As a user with multiple contracts
  I want the total value component to update when I change contracts
  So that I can see accurate financial information for each contract

  Scenario: Total value component updates correctly when changing contracts
    Given the user is authenticated in Acticenter
    And the user has selected the first contract
    And the total value component is visible
    When the user records the total value of the first contract
    And the user searches for a second different contract
    And the user selects the second contract from search results
    Then the total value component should display the second contract value
    And the total value should be different from the first contract value