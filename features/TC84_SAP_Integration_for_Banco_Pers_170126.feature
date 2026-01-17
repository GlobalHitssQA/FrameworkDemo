Feature: SAP Integration for Banco Persona Moral Contract with Mexdolar Account

  Scenario: Verify SAP service integration displays Mexdolar USD balance without currency conversion
    Given the user is authenticated in Acticenter
    And a Banco Persona Moral contract with associated Mexdolar account exists
    When the user selects the Banco Persona Moral contract with Mexdolar account
    Then the system loads the selected contract
    When the user expands the contract value breakdown
    Then the system invokes SAP service to retrieve Mexdolar account balance
    And the USD Cash field displays the Mexdolar balance from SAP
    And the balance is displayed in USD without MXN conversion