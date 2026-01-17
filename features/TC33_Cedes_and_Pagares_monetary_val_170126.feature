Feature: Cedes and Pagares monetary value verification in contract breakdown

  Scenario: Verify that Cedes and Pagares monetary value matches the correct accumulated investment amount
    Given the user is authenticated in Acticenter
    And the user selects a contract with known investments in Cedes and Pagares
    And the system loads the contract and displays the main information
    When the user obtains the reference value for Cedes and Pagares from the source system
    And the user clicks on the total contract value component to display the breakdown
    Then the system displays the popup with the detailed breakdown
    And the monetary value shown in Cedes and Pagares section matches the reference value
    And the value is displayed with currency format and aligned to the right