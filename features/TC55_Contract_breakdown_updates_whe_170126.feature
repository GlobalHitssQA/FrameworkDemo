Feature: Contract breakdown updates when changing contracts

  Scenario: Verify that the breakdown of items updates correctly when changing contracts
    Given the user is authenticated in Acticenter
    And the user selects the first available contract
    And the system displays the first contract information with the total value component visible
    When the user clicks on the total value component to display the breakdown
    Then the system displays the popup showing the breakdown of items for the first contract
    And the user records the values of the items shown in the breakdown
    When the user closes the breakdown popup
    And the user uses the search function to select a different second contract
    Then the system displays the second contract information
    When the user clicks on the total value component to display the breakdown again
    Then the system displays the popup showing the updated breakdown with the second contract items
    And the breakdown values correspond to the second contract and are different from the first contract