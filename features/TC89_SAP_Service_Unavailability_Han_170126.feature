Feature: SAP Service Unavailability Handling for Mexdolar Account

  Scenario: Verify component behavior when SAP service providing Mexdolar information is unavailable
    Given the SAP service for Mexdolar balance is unavailable
    And the user is authenticated in Acticenter
    When the user selects a Banco Persona Moral contract with Mexdolar account
    Then the system attempts to load the total contract value component
    And the system displays a message indicating USD Cash information is unavailable or shows indeterminate value
    When the user opens the breakdown popup
    Then the USD Cash section shows an error or unavailable status or zero with service failure indication
    And the other sections independent of SAP service display their correct values