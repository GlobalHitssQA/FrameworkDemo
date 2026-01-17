Feature: Contract breakdown displays single active item correctly

  Scenario: Verify breakdown shows one item with value and others at zero
    Given the user is authenticated in Acticenter
    And the user has selected a contract with only one item having value and others at zero
    When the user views the contract information
    Then the total value component should be visible
    When the user clicks on the total value component to display the breakdown
    Then the breakdown popup should be displayed showing all applicable items
    And the active item should display its corresponding monetary value on the right side
    And the items without monetary value should display zero pesos zero cents
    And the total value should match the single active item value