Feature: Contract items with zero balance display

  Scenario: Verify that applicable contract items without balance show $0.00 instead of being empty or hidden
    Given the user is authenticated in Acticenter with valid advisor credentials
    When the user selects a contract that has some items without balance or with zero value
    And the user clicks on the value and composition component to display the breakdown
    Then the system displays the popup with the complete list of applicable items for the contract
    And the items without monetary value show exactly $0.00 with correct currency format
    And no applicable item appears empty or without value