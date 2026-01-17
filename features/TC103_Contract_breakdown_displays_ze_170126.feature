Feature: Contract breakdown displays zero balance items

  Scenario: Verify that items without balance show $0.00 in contract breakdown
    Given the user is authenticated in Acticenter
    And a contract with at least one item without monetary balance is available
    When the user selects a contract that has at least one item without monetary balance
    Then the system loads the selected contract
    When the user clicks on the total value component to display the breakdown
    Then the system displays the popup with the complete breakdown of items
    When the user identifies the items that have no monetary balance
    Then the items without balance are displayed with the value $0.00
    And all applicable items for the contract are present even showing $0.00