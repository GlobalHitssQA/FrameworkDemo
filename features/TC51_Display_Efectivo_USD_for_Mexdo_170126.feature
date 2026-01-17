Feature: Display Efectivo USD for Mexdolar contracts without exchange rate conversion

  Scenario: Verify Efectivo USD displays Mexdolar account balance without currency conversion
    Given the user is authenticated in Acticenter with access to Banco Persona Moral contracts
    When the user searches and selects a Banco Persona Moral contract with a related Mexdolar account
    And the user clicks on the total contract value component to display the breakdown
    Then the Efectivo USD section should display the Mexdolar account balance in US dollars without exchange rate conversion