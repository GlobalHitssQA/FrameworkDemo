Feature: Buy Sell Icon Disabled for Mexdolar Contracts

  Scenario: Verify buy sell icon is disabled for Mexdolar Persona Moral contracts preventing operations
    Given the user is authenticated in Acticenter
    When the user searches and selects a Mexdolar Persona Moral contract
    Then the buy sell icon should be visually disabled
    And clicking on the buy sell icon should not trigger any action
    And no Lumina error message should be displayed