Feature: Money Market Breakdown Display for Contract Without Investments

  Scenario: Verify money market section shows zero value when contract has no money market investments
    Given the user is authenticated and on the contract value screen
    And a contract without money market investments is available
    When the user selects a contract without money market investments
    Then the contract is displayed with its total value
    When the user clicks on the total contract value component
    Then the breakdown popup is displayed with contract value details
    When the user locates the Money Market section in the breakdown list
    Then the Money Market section displays a monetary value of "$0.00"
    When the user clicks outside the breakdown component
    Then the popup closes correctly