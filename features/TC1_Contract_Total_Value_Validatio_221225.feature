Feature: Contract Total Value Validation in Acticenter
  As a patrimonial, private or wealth management banking advisor
  I want to view the total contract value in the main component
  So that I can verify the accurate consolidated amount of all contract items

  Background:
    Given the user is authenticated as an advisor with patrimonial, private or wealth management profile
    And there is at least one client with an active contract in Stock Brokerage or Bank
    And Lumina services for funds are operational and available

  Scenario: Verify total contract value display in main component
    Given the user has successfully logged into Acticenter as a patrimonial banking advisor
    When the user selects an existing client and contract using the search function with magnifying glass
    Then the system displays the general screen of the selected client or contract
    When the user navigates to the funds operation flow where the contract value component is located
    Then the system shows the main component with the total contract value
    And the component displays the total contract value on the review date with correct monetary format
    And the displayed value matches the sum of all items including purchasing power MXN, cash MXN, cash USD, pending settlements, debt funds, hedge funds, equity funds, cash in transit, CDs and promissory notes, money market and capital market as applicable to the contract type