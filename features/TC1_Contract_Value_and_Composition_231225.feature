Feature: Contract Value and Composition Validation for Individual Person with Bank Contract

  As a wealth management advisor
  I want to view the value and composition breakdown of an Individual Person Bank contract
  So that I can review the complete financial details of the contract

  Background:
    Given the user is authenticated in Acticenter as a wealth management advisor
    And there is an Individual Person Bank contract available with valuation information
    And the SAP Pasivos integration is working correctly

  Scenario: Display and validate contract value component for Individual Person Bank contract
    Given the advisor has logged into Acticenter
    When the advisor selects an Individual Person Bank contract from the Advisor module
    Then the system displays the selected contract information
    And the total contract value component shows the accumulated monetary value at review date
    When the advisor clicks on the total value component
    Then a pop-up displays with the complete breakdown
    And the breakdown shows the following items: Cash MXN, Cash USD, Pending settlements, Debt funds, Hedge funds, Equity funds, CDs and promissory notes, Money market, Capital market
    And the Cash MXN field displays the correct balance from the contract's main account obtained from SAP Pasivos service
    And the breakdown list is correctly aligned vertically with the total contract value component
    When the advisor clicks outside the component
    Then the breakdown pop-up closes correctly