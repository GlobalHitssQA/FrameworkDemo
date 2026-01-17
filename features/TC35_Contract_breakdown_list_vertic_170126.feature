Feature: Contract breakdown list vertical alignment verification

  Scenario: Verify breakdown list is vertically aligned with total value component
    Given the user is authenticated in Acticenter as an advisor
    When the user selects a contract from the query screen
    And the user clicks on the value and composition component to display the breakdown
    Then the breakdown list should be vertically aligned with the total contract value component