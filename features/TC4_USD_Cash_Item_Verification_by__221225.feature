Feature: USD Cash Item Verification by Contract Type and Mexdolar Configuration

  Background:
    Given the system has brokerage house contracts with USD balances
    And the system has corporate bank contracts with and without related Mexdolar accounts
    And SAP integration is available for Mexdolar balance retrieval

  Scenario: Verify USD Cash item display for brokerage house contract
    Given I have selected a brokerage house contract
    When I expand the composition breakdown
    Then the pop-up shows the breakdown with all applicable items for brokerage house contract
    And the USD Cash item is present
    And the USD Cash item displays the contract amount in US dollars without conversion

  Scenario: Verify USD Cash item display for corporate bank contract with Mexdolar account
    Given I have selected a corporate bank contract with related Mexdolar account
    When I expand the composition breakdown
    Then the USD Cash item is present
    And the USD Cash item displays the Mexdolar account balance from SAP
    And the USD balance is shown without exchange rate conversion to MXN

  Scenario: Verify USD Cash item is not displayed for contracts without Mexdolar account
    Given I have selected a bank contract without Mexdolar account
    When I expand the composition breakdown
    Then the USD Cash item is not present in the breakdown

  Scenario: Verify USD Cash item displays zero when no USD balance exists
    Given I have selected a contract with no USD balance
    When I expand the composition breakdown
    Then the USD Cash item displays "USD $0.00"