Feature: Verify Efectivo USD displays Mexdolar account balance from SAP

  Scenario: Efectivo USD value matches Mexdolar account balance from SAP for Banco Persona Moral contract
    Given the user is authenticated in Acticenter
    When the user selects a Banco Persona Moral contract with associated Mexdolar account
    And the user clicks on the total contract value component
    Then the contract value breakdown popup is displayed
    And the system retrieves the Mexdolar account balance from SAP
    When the user locates the Efectivo USD item in the breakdown
    Then the Efectivo USD value should match the Mexdolar account balance from SAP