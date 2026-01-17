Feature: Contract Value Update Verification
  As a user of Acticenter
  I want to verify that the component updates correctly when switching contracts
  So that I can trust the displayed information is accurate

  Scenario: Verify component values update correctly when changing from one contract to another
    Given the user is authenticated and on the Acticenter system
    When the user selects an initial contract
    Then the system loads the contract and displays the component with the selected contract values
    When the user records the values shown in the initial contract breakdown
    Then the values of the first contract are stored for later comparison
    When the user clicks on the search icon to find another contract
    Then the client general screen is displayed allowing contract selection
    When the user selects a second different contract
    Then the system loads the newly selected contract
    And the total contract value is updated correctly for the second contract
    When the user expands the breakdown section
    Then all breakdown items are updated and correspond to the second contract
    And the values are different from the first contract