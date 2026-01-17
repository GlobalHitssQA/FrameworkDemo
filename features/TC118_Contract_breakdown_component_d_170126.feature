Feature: Contract breakdown component displays all investment categories

  Scenario: Verify all investment categories are displayed correctly for a diversified contract
    Given the user is authenticated in Acticenter
    And a contract with diversified investments in all categories is available
    When the user selects the contract with all investment categories
    Then the total contract value component displays the accumulated value
    When the user clicks on the total value component to expand the breakdown
    Then the breakdown popup displays all investment categories with their values
    And each category displays a positive value with correct currency format
    And the sum of all category values matches the total value displayed