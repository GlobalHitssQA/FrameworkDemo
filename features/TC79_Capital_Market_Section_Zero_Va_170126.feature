Feature: Capital Market Section Zero Value Display

  Scenario: Verify capital market section shows zero when no investments exist
    Given I am authenticated as an advisor or banker user
    And I have access to a contract without capital market investments
    When I select the contract without capital market investments
    Then the system loads and displays the selected contract
    When I click on the total contract value component to expand the breakdown
    Then the popup opens showing all applicable sections for the contract type
    When I locate the Capital Market section in the list
    Then the Capital Market section displays a value of $0.00 on the right side
    And all sections without balance show $0.00 with consistent formatting