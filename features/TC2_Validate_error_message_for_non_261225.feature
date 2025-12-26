Feature: Validate error message for non-existent GitHub user search

  Background:
    Given the GitHub profile search component is accessible

  Scenario: System displays friendly error message when searching for a non-existent user
    Given the user is on the GitHub profile search page
    And the search input and search button are visible
    When the user enters a non-existent username "usuarioquenoexiste123456789" in the search field
    And the user clicks the search button
    Then the system should query the GitHub API for the entered username
    And the system should display a friendly error message indicating the user was not found
    And the profile section should remain empty
    And the metrics dashboard should not display any data
    And the followers list should remain empty