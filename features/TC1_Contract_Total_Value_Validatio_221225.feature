Feature: Contract Total Value Validation in Acticenter
  As a wealth management advisor
  I want to view the total contract value in the main component
  So that I can verify the accurate consolidation of all contract items

  Background:
    Given the user is authenticated as a wealth management advisor
    And there is at least one active client with a contract
    And Lumina services for funds are operational and available

  Scenario: Validate contract total value display in main component
    Given the advisor is logged into Acticenter
    When the advisor searches for and selects an existing client and contract using the search icon
    Then the system displays the general screen for the selected client or contract
    When the advisor navigates to the funds operation flow
    Then the main component displays the total contract value
    And the contract value is shown with proper monetary format
    And the total value matches the sum of all contract components including MXN purchasing power, MXN cash, USD cash, pending settlements, debt funds, hedge funds, equity funds, cash in transit, CDs and promissory notes, money market and capital market when applicable