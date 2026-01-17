Feature: Verify monetary format in contract breakdown

  Scenario: All breakdown items display values in correct monetary format
    Given the user is authenticated in Acticenter as a valid advisor
    When the user selects a contract with values in multiple breakdown items
    And the user clicks on the value and composition component to display the full breakdown
    Then all monetary values should display currency format with peso or dollar sign
    And all monetary values should display thousand separators with comma
    And all monetary values should display exactly two decimal places