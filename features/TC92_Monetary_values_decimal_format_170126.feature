Feature: Monetary values decimal formatting in contract breakdown

  Scenario: Verify all monetary values in the breakdown display correct two decimal rounding
    Given the user is authenticated in Acticenter
    And the user selects a contract with decimal monetary values in multiple categories
    When the system loads the contract
    Then the total value component should be displayed
    When the user clicks on the total value component to expand the breakdown
    Then the breakdown popup should display all categories with monetary values
    And each category should display monetary values with exactly two decimals
    And values with more than two decimals should be rounded correctly according to mathematical rules