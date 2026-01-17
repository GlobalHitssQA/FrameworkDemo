Feature: Visual transition smoothness when expanding contract breakdown component

  Scenario: Verify smooth visual transitions when expanding the contract breakdown component
    Given the user is authenticated in Acticenter
    And the user has selected an active contract
    And the contract value and composition component is visible in collapsed state
    When the user clicks on the component to expand the breakdown
    Then the component should expand showing the itemized breakdown list
    And the visual transition should be smooth without jumps or interruptions
    When the user repeats the expand action from different contracts
    Then the visual transition should be smooth and consistent in all cases