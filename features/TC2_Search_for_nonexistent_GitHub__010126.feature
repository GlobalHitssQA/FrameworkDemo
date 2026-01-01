Feature: Search for non-existent GitHub user

  Scenario: User searches for a non-existent GitHub username and sees error message
    Given the user navigates to the GitHub search page
    When the user enters a non-existent username "thisusernamedoesnotexist123456789" in the search field
    And the user clicks the search button
    And the user filters results by users
    Then the system displays an empty state message indicating the user was not found