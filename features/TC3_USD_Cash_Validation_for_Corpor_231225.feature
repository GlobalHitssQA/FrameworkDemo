Feature: USD Cash Validation for Corporate Bank Contracts with Mexdolar Account

  As a wealth management advisor
  I want to view USD cash balances from Mexdolar accounts
  So that I can see accurate valuation breakdown for Corporate Bank contracts

  Background:
    Given the advisor is authenticated in Acticenter
    And SAP Pasivos service is operational

  Scenario: Display USD Cash for Corporate Bank contract with Mexdolar account
    Given a Corporate Bank contract with an associated Mexdolar account exists
    When the advisor searches and selects the contract with Mexdolar account
    And the advisor clicks on the total valuation component
    Then the valuation breakdown popup is displayed
    And the USD Cash field is visible in the breakdown
    And the USD Cash amount matches the Mexdolar account balance from SAP
    And the USD Cash amount is displayed without currency conversion

  Scenario: USD Cash field not displayed for contracts without Mexdolar account
    Given a Corporate Bank contract without Mexdolar account exists
    When the advisor searches and selects the contract without Mexdolar account
    And the advisor clicks on the total valuation component to open breakdown
    Then the valuation breakdown popup is displayed
    And the USD Cash field is not present in the breakdown