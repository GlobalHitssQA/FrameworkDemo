Feature: Contract breakdown component visual transitions on close

  Scenario: Verify smooth visual transitions when closing contract breakdown component
    Given the user is authenticated in Acticenter
    And the user has selected an active contract
    And the contract value and composition component is visible
    When the user clicks on the component to expand the breakdown
    Then the breakdown opens showing the list of contract items
    When the user clicks outside the expanded component to close it
    Then the component closes collapsing the breakdown
    And the visual transition is smooth without jumps or interruptions
    When the user repeats the close action multiple times
    Then all close transitions execute smoothly and consistently