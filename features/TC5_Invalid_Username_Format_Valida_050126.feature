Feature: Invalid Username Format Validation

  Scenario: Verify error handling for invalid username format with special characters
    Given the user navigates to the GitHub profile search component
    When the user enters an invalid username format "@#$%invalid" in the search field
    And the user clicks the search button
    Then an error message should be displayed
    And the error message should indicate the username format is invalid
    And the error message should provide guidance on valid GitHub username formats