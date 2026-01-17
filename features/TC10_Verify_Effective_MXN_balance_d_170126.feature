Feature: Verify Effective MXN balance display for Banco Persona Moral contracts

  Scenario: Display Effective MXN balance from checking account for Banco Persona Moral contract
    Given the user is authenticated in Acticenter
    And a Banco Persona Moral contract with active checking account is available
    When the user selects a Banco Persona Moral contract in Acticenter
    Then the system displays the operation screen with the selected Banco Persona Moral contract
    When the user clicks on the total contract value component to display the breakdown
    Then the system displays the popup with the contract breakdown items
    And the Effective MXN item is visible in the breakdown list
    And the Effective MXN value matches the checking account balance from backend services