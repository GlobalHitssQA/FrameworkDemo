Feature: Contract component values auto-update on buy/sell operations

  Scenario: Verify component values update automatically when buy or sell operations are executed
    Given the user is authenticated in Acticenter with operation permissions
    And the user has an active contract with available balance
    When the user selects a contract and opens the breakdown popup
    Then the popup displays the breakdown with current values for each category
    When the user records the initial values of relevant categories
    Then the initial values are documented for later comparison
    When the user executes a fund purchase operation for the selected contract
    Then the operation is executed correctly and registered in the system
    When the user observes the total contract value component
    Then the total value updates automatically without page refresh
    When the user opens the breakdown popup again
    Then the affected categories show the new updated values in real time