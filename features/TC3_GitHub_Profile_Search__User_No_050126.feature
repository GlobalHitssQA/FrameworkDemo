Feature: GitHub Profile Search - User Not Found

  Scenario: Search for a non-existent GitHub user
    Given the user is on the GitHub profile search page
    When the user enters a non-existent username "thisuserdoesnotexist123456789"
    And the user clicks the search button
    Then an error message or empty state should be displayed
    And the error message should indicate the user was not found