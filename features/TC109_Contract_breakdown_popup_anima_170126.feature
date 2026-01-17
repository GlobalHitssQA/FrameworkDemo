Feature: Contract breakdown popup animation verification

  Scenario: Verify that the breakdown popup has a smooth opening animation according to Look and Feel specifications
    Given the user is authenticated in Acticenter
    And an active contract is available
    When the user accesses the contract value and composition component
    Then the contract value and composition component is displayed
    When the user clicks on the component to open the breakdown popup
    Then the popup opens with a smooth animation without visual jumps
    And the popup is vertically aligned with the main component
    When the user repeats the popup opening action multiple times
    Then the animation is consistent across all executions with uniform duration and effect