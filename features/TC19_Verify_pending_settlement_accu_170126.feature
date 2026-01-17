Feature: Verify pending settlement accumulated amount

  Scenario: Verify that Pending to Settle section contains the correct accumulated monetary amount of all pending operations
    Given the user is authenticated in Acticenter module
    When the user selects a contract with multiple pending settlement operations
    And the user retrieves the pending settlement operations for the selected contract
    And the user clicks on the total contract value component to display the breakdown
    Then the system displays a popup with the contract value breakdown showing Pending to Settle section
    And the Pending to Settle value matches the total sum of all pending settlement operations
    And all pending operations are included in the accumulated calculation without omissions