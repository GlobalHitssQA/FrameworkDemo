Feature: Contract Value and Composition Component Access Control

  Scenario: Verify that only authenticated users with appropriate permissions can view the contract value and composition component
    Given a user with advisor or wealth management banker permissions is on the login page
    When the user authenticates with valid credentials
    Then the user should access the Acticenter system successfully
    And the user navigates to the funds operation flow
    And the user selects a valid contract
    Then the contract value and composition component should be visible
    When the user logs out from the system
    And the user authenticates with a user without component view permissions
    Then the contract value and composition component should not be visible or show access restriction message