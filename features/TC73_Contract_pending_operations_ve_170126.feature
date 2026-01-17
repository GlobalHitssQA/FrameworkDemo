Feature: Contract pending operations verification
  As a user of OTA-ACTICENTER
  I want to verify the behavior when a contract has no pending operations to settle
  So that I can confirm the system displays zero value for pending items

  Scenario: Verify contract with no pending operations shows zero value
    Given I am authenticated in the system
    And I have access to a contract without pending operations to settle
    When I select the contract without pending operations
    Then the system loads the selected contract
    When I click on the total value component to display the breakdown
    Then the popup with the contract value breakdown is displayed correctly
    When I locate the pending to settle item in the list
    Then the pending to settle item shows a value of zero
    And the total contract value matches the sum of other items without including pending operations