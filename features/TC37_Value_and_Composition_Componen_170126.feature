Feature: Value and Composition Component Desktop Display for Patrimonial Banking

  Scenario: Verify deployment and functionality of value and composition component in Desktop view for Patrimonial Banking
    Given the user is authenticated in Acticenter from a Desktop device with Patrimonial Banking credentials
    When the user selects a Patrimonial Banking contract from the query module
    Then the system displays the contract with the total value component visible on screen
    When the user clicks on any part of the value and composition component
    Then the system displays the popup with the complete breakdown of applicable items for Patrimonial Banking
    And the breakdown shows all items with values aligned to the right including purchasing power or cash, pending settlement, debt funds, hedge funds, variable income funds, cash in transit, certificates and promissory notes, money market and capital market
    When the user clicks outside the breakdown popup
    Then the system closes the popup and returns to the total value component view