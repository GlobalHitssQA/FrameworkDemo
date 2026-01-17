Feature: Contract value and composition component position verification

  Scenario: Verify that the Contract Value and Composition component appears in the correct position within the funds operation flow
    Given the user is authenticated in Acticenter as an advisor or wealth management banker
    When the user starts the funds operation flow
    And the user selects a client and a contract
    Then the Contract Value and Composition component should be visible
    And the component should appear after contract selection and before the buy/sell widget
    And the component should be vertically aligned with the rest of the flow elements