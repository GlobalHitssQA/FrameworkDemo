Feature: Contract Value Breakdown - Cedes and Pagares Visualization

  Scenario: Verify Cedes and Pagares section displays with corresponding monetary value in contract breakdown
    Given the user is authenticated in Acticenter
    And the user has selected a contract with Cedes and Pagares investments
    When the user clicks on the total contract value component
    Then the contract value breakdown popup is displayed
    And the Cedes and Pagares section is visible in the breakdown list
    And the Cedes and Pagares section displays the accumulated monetary value on the right side