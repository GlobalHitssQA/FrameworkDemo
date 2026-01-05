Feature: GitHub Profile Search - User Not Found

  Scenario: Display error message when searching for non-existent user
    Given the user navigates to the GitHub profile search component
    When the user searches for a non-existent GitHub username
    Then an empty state message should be displayed
    And the message should clearly indicate that no user was found