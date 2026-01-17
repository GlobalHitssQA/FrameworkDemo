Feature: Contract valuation breakdown displays zero value items

  Scenario: Verify that applicable contract items with no monetary value are displayed as $0.00 in valuation breakdown
    Given the user is authenticated in Acticenter
    And a contract with at least one applicable item without balance is selected
    When the user views the total contract value component
    Then the system displays the total contract value component
    When the user identifies which applicable items have no monetary value
    Then the items with zero value are identified
    When the user clicks on the total contract value component
    Then the system displays the popup with detailed contract value breakdown
    When the user verifies the applicable items without monetary value in the list
    Then all applicable items are displayed and those without monetary value show exactly $0.00 on the right side