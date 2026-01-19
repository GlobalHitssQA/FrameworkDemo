Feature: USD Cash Display for Persona Moral Bank Contracts with Mexdolar Account

  Scenario: Verify USD cash is correctly displayed for Persona Moral Bank contracts with associated Mexdolar account
    Given the user is authenticated in Acticenter
    And a Persona Moral Bank contract with associated Mexdolar account exists
    And a Persona Moral Bank contract without Mexdolar account exists
    When the user selects the contract with Mexdolar account
    Then the system loads the contract and displays the total contract value component
    When the user clicks on the total value component to expand the breakdown
    Then the system displays the popup with detailed contract composition breakdown
    And the USD Cash item appears in the breakdown
    And the USD Cash value shows the Mexdolar account balance from SAP
    And the USD Cash value is displayed in dollars without currency conversion
    When the user selects the contract without Mexdolar account
    And the user clicks on the total value component to expand the breakdown
    Then the USD Cash item is not displayed in the breakdown