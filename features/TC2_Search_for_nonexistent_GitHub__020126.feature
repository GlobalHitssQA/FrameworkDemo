Feature: Search for non-existent GitHub user

  Scenario: Verify error message is displayed when searching for a non-existent user
    Given the user is on the GitHub search page
    When the user enters a non-existent username in the search field
    And the user clicks the search button
    Then the system should display a message indicating no users were found