Feature: Mexdolar contract buy/sell icon disabled verification

  Scenario: Verify that Mexdolar contracts do not allow operations by disabling the buy/sell icon
    Given the user is authenticated in Acticenter with access to Banco Persona Moral contracts
    When the user searches and selects a Mexdolar type Banco Persona Moral contract
    Then the system displays the selected Mexdolar contract information
    And the buy/sell icon should be displayed in disabled or unavailable state
    When the user attempts to click on the buy/sell icon
    Then the system should not allow interaction and should not open any operation functionality
    And the contract should only display information in view-only mode without buy or sell options