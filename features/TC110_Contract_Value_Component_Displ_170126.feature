Feature: Contract Value Component Displays Correct Values When Switching Between Multiple Contracts

  Scenario: Verify component shows correct values when alternating between multiple contracts of the same client
    Given I am logged into Acticenter
    And I search for a client with multiple active contracts
    Then the system displays the list of available contracts for the client
    When I select the first contract
    And I click on the total value component
    Then the popup displays the breakdown corresponding to the first contract with its specific items
    When I close the popup
    Then the popup closes correctly and only the total value component is visible
    And I note the values shown for the first contract
    When I switch to the second contract of the same client
    Then the system loads the second contract
    When I click on the total value component of the second contract
    Then the popup displays the breakdown corresponding to the second contract showing different values than the first contract
    And the displayed values correspond exclusively to the selected contract without mixing information from other contracts