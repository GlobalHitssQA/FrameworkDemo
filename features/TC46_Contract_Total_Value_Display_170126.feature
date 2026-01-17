Feature: Contract Total Value Display
  As a user of Acticenter
  I want to see the total contract value with the correct review date
  So that I can verify the contract information is up to date

  Scenario: Verify that the component displays the total contract value with correct review date
    Given the user is authenticated in Acticenter
    When the user accesses the system and selects a contract
    Then the system loads the contract and displays the value and composition component
    And the component displays the review date of the total contract value
    And the review date corresponds to the current date or last update date
    And the total value is consistent with the displayed review date