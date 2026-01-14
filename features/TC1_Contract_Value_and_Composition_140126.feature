Feature: Contract Value and Composition Display for Individual Stock Brokerage

  Scenario: Verify contract value display and breakdown for Casa de Bolsa account
    Given the user has valid advisor credentials for Acticenter platform
    And Individual Stock Brokerage contracts exist in the system
    When the user accesses the Acticenter platform with valid credentials
    Then the system authenticates the user and displays the main dashboard
    When the user searches and selects an Individual Stock Brokerage contract for a physical person
    Then the system displays the selected contract with the contract value component visible
    And the total contract value is displayed in MXN with proper currency formatting
    When the user clicks on the contract value component to expand breakdown details
    Then the popup displays showing detailed breakdown with all required items
    And each breakdown item displays monetary value aligned to the right
    And items without value display zero amount
    And Poder de compra MXN value matches the buying power from Module Asesor
    And Efectivo USD displays the dollar amount for the contract
    When the user clicks outside the breakdown popup
    Then the popup closes and returns to the main contract view