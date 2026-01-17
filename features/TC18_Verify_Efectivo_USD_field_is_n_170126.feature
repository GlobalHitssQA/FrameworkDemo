Feature: Verify Efectivo USD field is not displayed for Banco Persona Fisica contracts without Mexdolar account

  Scenario: Efectivo USD should not appear in contract breakdown for Banco Persona Fisica without Mexdolar
    Given the user is authenticated in Acticenter
    When the user selects a Banco Persona Fisica contract without Mexdolar account
    And the user clicks on the total contract value component
    Then the contract value breakdown popup is displayed
    And the Efectivo USD field should not be visible in the breakdown
    And only applicable fields for Banco contracts without Mexdolar should be displayed