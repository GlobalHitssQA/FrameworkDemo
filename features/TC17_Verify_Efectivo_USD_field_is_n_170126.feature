Feature: Verify Efectivo USD field is not displayed for Banco contracts without Mexdolar account

  Scenario: Efectivo USD should not be shown in breakdown for Banco contract without Mexdolar account
    Given the user is authenticated and on the Acticenter main screen
    When the user selects a Banco contract without Mexdolar account
    And the user clicks on the total contract value component
    Then the breakdown popup should be displayed
    And the Efectivo USD field should not be visible in the breakdown
    And only applicable fields for Banco contracts without Mexdolar should be displayed