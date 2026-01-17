Feature: Contract breakdown display with multiple active items

  Scenario: Verify breakdown shows all items correctly when contract has multiple items with values
    Given the user is authenticated in Acticenter
    And the user selects a contract with values in multiple items like Purchasing power, Pending settlement, Debt funds, Hedge funds and Variable income funds
    When the user clicks on the total value component to display the breakdown
    Then the system displays the popup showing all applicable items for the contract
    And all items with value greater than zero are displayed with their respective amounts aligned to the right
    And the breakdown list is vertically aligned with the total value component
    And the sum of all items matches the total value shown in the component