Feature: Verify Mexdolar account balance from SAP is displayed in Efectivo USD section

  Scenario: Display Mexdolar account balance obtained from SAP in Efectivo USD field
    Given the user is authenticated in Acticenter
    When the user selects a Banco Persona Moral contract with associated Mexdolar account
    And the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the SAP microservice returns the Mexdolar account balance
    And the Efectivo USD field displays the Mexdolar balance without currency conversion