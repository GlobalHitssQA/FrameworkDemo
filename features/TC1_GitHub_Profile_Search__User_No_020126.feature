Feature: GitHub Profile Search - User Not Found Validation

  Scenario: Verify error handling when searching for a non-existent GitHub user
    Given the user is on the GitHub Profile Search page
    When the user enters an invalid username "thisuserdoesnotexist123456789" in the search field
    And the user clicks the search button
    Then the system should display a user not found error message
    And no profile information should be displayed
    And no metrics dashboard should be visible
    And no followers list should be displayed