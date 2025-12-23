Feature: Contract Value Breakdown Popup Validation for Legal Entity in Brokerage House

  As an advisor in the Brokerage House
  I want to view a detailed breakdown of a Legal Entity contract value
  So that I can see all components including purchasing power, cash, funds, certificates, and market values

  Background:
    Given the user is authenticated as a Brokerage House advisor
    And valuation services are operational
    And Advisor currentCash module is available
    And APIs for funds, certificates, promissory notes and markets are functioning correctly

  Scenario: Display complete contract value breakdown popup for Legal Entity
    Given the advisor has accessed Acticenter system
    When the advisor searches and selects a Legal Entity contract in Brokerage House
    And the total contract value component is displayed
    And the advisor clicks on the total contract value component
    Then a popup with complete contract value breakdown should be displayed
    And the "Purchasing Power MXN" item should display the currentCash value from Advisor Module with right alignment
    And the "Cash USD" item should display the amount in US dollars with right alignment
    And the "Pending Settlement" item should display the corresponding accumulated monetary value
    And the "Debt Funds" item should display the correct accumulated value
    And the "Hedge Funds" item should display the correct accumulated value
    And the "Variable Income Funds" item should display the correct accumulated value
    And the "Certificates and Promissory Notes" item should display the corresponding accumulated value
    And the "Money Market" item should display the correct accumulated value
    And the "Capital Market" item should display the correct accumulated value
    And items without value should display "$0.00"
    And the breakdown list should be vertically aligned with the total value component