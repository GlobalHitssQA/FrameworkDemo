Feature: Contract Value Breakdown - USD Cash Item Verification

  As a user of Acticenter
  I want to verify the USD Cash item display in contract value breakdown
  So that I can see correct USD balances for different contract types

  Background:
    Given the user is authenticated in Acticenter
    And SAP Pasivos service is operational
    And AGAS-21806 microservice is implemented

  Scenario: Verify USD Cash item appears for Banco Persona Moral contract with Mexdolar account
    Given the user selects a Banco Persona Moral contract with associated Mexdolar account
    When the user views the total contract value component
    And the user opens the contract value breakdown
    Then the breakdown popup is displayed
    And the USD Cash item is visible
    And the USD Cash item shows the Mexdolar account balance from SAP without conversion

  Scenario: Verify USD Cash item does not appear for Banco contract without Mexdolar account
    Given the user selects a Banco Persona Fisica contract without Mexdolar account
    When the user views the total contract value component
    And the user opens the contract value breakdown
    Then the breakdown popup is displayed
    And the USD Cash item is not visible

  Scenario: Verify USD Cash item appears for Casa de Bolsa contract with USD currency amount
    Given the user selects a Casa de Bolsa contract with USD currency amount
    When the user views the total contract value component
    And the user opens the contract value breakdown
    Then the breakdown popup is displayed
    And the USD Cash item is visible
    And the USD Cash item shows the contract USD currency amount

  Scenario: Verify USD Cash item shows zero when no USD balance exists
    Given the user selects a contract with no USD balance
    When the user opens the contract value breakdown
    Then the USD Cash item displays zero dollars