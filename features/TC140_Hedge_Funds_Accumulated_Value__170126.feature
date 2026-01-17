Feature: Hedge Funds Accumulated Value Verification

  Scenario: Verify that the accumulated value in Hedge Funds matches the sum of all hedge fund investments
    Given the user is authenticated and viewing a contract with multiple hedge fund investments
    When the user selects the contract containing hedge fund investments
    Then the system displays the contract value and composition component
    When the user retrieves individual hedge fund investment values from the system
    Then the user calculates the expected total hedge fund value
    When the user clicks on the contract value component to display the breakdown
    Then the system displays the popup with the breakdown including the Hedge Funds section
    And the accumulated value shown in Hedge Funds matches the calculated sum of all individual hedge fund investments