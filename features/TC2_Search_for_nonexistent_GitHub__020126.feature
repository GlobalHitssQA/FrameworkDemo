Feature: Search for non-existent GitHub user profile

  Scenario: Verify error handling when searching for a non-existent GitHub user
    Given the user is on the GitHub profile search component
    When the user enters an invalid username "thisuserdoesnotexist123456789" in the search input field
    And the user clicks the search button
    Then the system should display an error message indicating the user was not found
    And no profile data or metrics should be displayed