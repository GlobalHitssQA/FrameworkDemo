Feature: Verification of USD Cash item in contract breakdown
  As an authenticated user in Acticenter
  I want to verify that USD Cash item displays correctly
  So that I can see accurate dollar amounts based on contract type

  Background:
    Given the user is authenticated in Acticenter
    And SAP Pasivos service is operational
    And AGAS-21806 microservice is implemented

  Scenario: Verify USD Cash displays for Banco Persona Moral contract with Mexdolar account
    Given a Banco Persona Moral contract with associated Mexdolar account is available
    When the user selects the contract
    And the user opens the contract value breakdown
    Then the USD Cash item should be visible
    And the USD Cash amount should match the Mexdolar account balance from SAP

  Scenario: Verify USD Cash does not display for Banco contract without Mexdolar
    Given a Banco Persona Fisica contract without Mexdolar account is available
    When the user selects the contract without Mexdolar
    And the user opens the contract value breakdown
    Then the USD Cash item should not be visible in the breakdown

  Scenario: Verify USD Cash displays for Casa de Bolsa contract with dollar currency
    Given a Casa de Bolsa contract with dollar currency amount is available
    When the user selects the Casa de Bolsa contract
    And the user opens the contract value breakdown
    Then the USD Cash item should be visible
    And the USD Cash amount should match the contract dollar amount

  Scenario: Verify USD Cash displays zero when no dollar balance exists
    Given a contract with no dollar balance is available
    When the user opens the contract value breakdown
    Then the USD Cash item should display "$0.00"