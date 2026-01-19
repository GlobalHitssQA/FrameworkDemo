Feature: Cash in transit calculation and display for Bank contracts

  Scenario: Verify cash in transit is calculated and displayed correctly only for Bank contracts using SAP prenotes information
    Given the user is authenticated in Acticenter with valid credentials
    When the user selects a Bank type contract with cash in transit operations
    And the user clicks on the value and composition component to display the breakdown
    Then the popup with the contract breakdown items is displayed
    And the "Cash in transit" item is visible in the breakdown
    And the value shown in "Cash in transit" matches the SAP prenotes service information
    When the user selects a Brokerage House type contract and opens the composition breakdown
    Then the popup displays showing applicable items
    And the "Cash in transit" item is not displayed for Brokerage House contracts