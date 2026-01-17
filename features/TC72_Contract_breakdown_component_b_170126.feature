Feature: Contract breakdown component behavior when contract has no USD Cash

  Scenario: Verify USD Cash field is not displayed for Bank contract without Mexdolar account and shows $0.00 for Brokerage contract without dollar balance
    Given the user is authenticated in the system
    And the user has access to the contract query functionality
    When the user selects a Bank contract for Physical or Moral Person without associated Mexdolar account
    Then the system loads the contract correctly
    When the user clicks on the total contract value component to open the breakdown
    Then the popup with the breakdown list of contract value is displayed
    When the user searches for the USD Cash item in the breakdown list
    Then the USD Cash item is not displayed in the list for Bank contracts without Mexdolar account
    When the user selects a Brokerage contract without dollar balance
    And the user verifies the USD Cash item
    Then the USD Cash item is displayed with value $0.00