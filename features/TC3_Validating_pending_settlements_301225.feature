Feature: Validating pending settlements calculation for all contract types

  Scenario: Verify pending settlements calculation across different contract types
    Given user logs in to Acticenter with valid credentials
    When user selects a Casa de Bolsa contract with pending settlements
    And user clicks on the contract value component
    Then the breakdown popup displays all applicable items
    And the Pendientes por liquidar field displays the accumulated monetary value
    When user selects a bank contract with pending settlements
    Then the breakdown popup displays pending settlements for bank contract
    And the Pendientes por liquidar calculation is consistent with Casa de Bolsa contract
    When user selects a contract with no pending settlements
    Then the Pendientes por liquidar field displays value of zero