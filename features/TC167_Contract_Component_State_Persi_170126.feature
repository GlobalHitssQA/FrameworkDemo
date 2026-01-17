Feature: Contract Component State Persistence During Navigation
  As an authenticated user
  I want the contract value and composition component to maintain its state
  When navigating between different Acticenter sections

  Scenario: Contract component maintains expanded state after navigation
    Given I am logged into Acticenter with an authenticated user
    And I have selected an active contract
    And the contract value and composition component is displayed in collapsed state
    When I click on the component to expand the breakdown
    Then the breakdown opens showing all contract items with their corresponding values
    When I navigate to another Acticenter section while keeping the same contract
    Then the system changes to the selected section
    When I return to the section containing the value and composition component
    Then the component maintains the expanded state it had before changing sections
    And all item values remain correct and updated in the breakdown