Feature: Contract Value Breakdown Validation
  As a user of Acticenter
  I want to validate that the purchasing power and cash items are displayed correctly
  So that I can verify the breakdown shows appropriate items based on contract type

  Background:
    Given the user is authenticated in Acticenter
    And a Brokerage House contract is available with currentCash balance
    And a Bank contract is available with main account balance
    And the currentCash Advisor Module is operational
    And SAP Passive Services are available for main account query

  Scenario: Validate Purchasing Power MXN for Brokerage House and Cash MXN for Bank contracts
    Given the user enters Acticenter and selects a Brokerage House contract
    When the contract total value component is displayed
    And the user opens the contract value breakdown for Brokerage House
    Then the popup with complete breakdown is displayed
    And the Purchasing Power MXN item is visible
    And the Purchasing Power MXN shows the correct currentCash value from Advisor Module
    And the Cash MXN item is not displayed in the Brokerage House contract
    When the user closes the popup and selects a Bank contract
    Then the Bank contract is selected and the total value component is displayed
    When the user opens the contract value breakdown for Bank
    Then the popup with complete breakdown is displayed
    And the Cash MXN item is visible
    And the Cash MXN shows the correct main account balance
    And the Purchasing Power MXN item is not displayed in the Bank contract
    And both items display values with correct currency format with two decimals