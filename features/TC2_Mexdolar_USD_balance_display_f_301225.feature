Feature: Mexdolar USD balance display for corporate bank accounts

  Scenario: Validate Efectivo USD balance display for corporate bank contracts with and without Mexdolar accounts
    Given the user logs in to Acticenter with banquero or advisor credentials
    When the user searches and selects a corporate bank contract with associated Mexdolar account
    Then the contract is displayed in the main view
    When the user clicks on the contract value component
    Then the breakdown pop-up is displayed with all applicable items
    And the Efectivo USD field is visible in the breakdown list
    And the Efectivo USD field displays the correct USD amount from SAP without currency conversion
    When the user selects a corporate bank contract without Mexdolar account
    Then the breakdown pop-up is displayed
    And the Efectivo USD field is not displayed in the breakdown
    When the user views a contract with Mexdolar account
    Then the contract is displayed in consultation mode only
    And buy and sell operations are disabled