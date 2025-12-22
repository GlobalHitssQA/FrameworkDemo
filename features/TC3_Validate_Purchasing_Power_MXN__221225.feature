Feature: Validate Purchasing Power MXN Display and Calculation
  As a user with access to Casa de Bolsa contracts
  I want to verify that the Purchasing Power MXN item is displayed correctly
  So that I can see accurate cash balance information for brokerage house contracts

  Background:
    Given the user is authenticated in Acticenter
    And the user has access to Casa de Bolsa contracts

  Scenario: Validate Purchasing Power MXN for Casa de Bolsa individual contract
    Given the user selects a Casa de Bolsa contract for an individual
    When the user clicks on the contract value component
    Then the system displays the breakdown popup
    And the Purchasing Power MXN item is present in the breakdown
    And the Purchasing Power MXN value matches the currentCash from advisor module

  Scenario: Validate Purchasing Power MXN for Casa de Bolsa corporate contract
    Given the user selects a Casa de Bolsa contract for a corporation
    When the user clicks on the contract value component
    Then the system displays the breakdown popup
    And the Purchasing Power MXN item is present in the breakdown
    And the Purchasing Power MXN value matches the currentCash from advisor module

  Scenario: Validate Purchasing Power MXN is not displayed for Bank contracts
    Given the user selects a Bank contract
    When the user clicks on the contract value component
    Then the system displays the breakdown popup
    And the Purchasing Power MXN item is not present in the breakdown