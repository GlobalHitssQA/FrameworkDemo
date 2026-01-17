Feature: Verify Effective USD value in Mexdolar contracts displays without exchange rate conversion

  Scenario: Effective USD value in Mexdolar Persona Moral contract matches SAP value without conversion
    Given the user is authenticated in Acticenter
    And the user has access to a Mexdolar Persona Moral contract with related account
    When the user selects a Mexdolar Persona Moral contract
    Then the system displays the screen with the selected contract
    When the user clicks on the total contract value component
    Then the system displays the popup with the contract value breakdown
    When the user locates the Effective USD item in the breakdown
    Then the Effective USD item is displayed with its corresponding value
    And the Effective USD amount matches exactly the SAP value without currency conversion