Feature: Validate error message for non-existent GitHub user

  Background:
    Given the GitHub profile search component is accessible

  @error @TC-002
  Scenario: Display friendly error message when searching for a non-existent user
    Given the user is on the GitHub homepage
    And the search input field is visible
    And the search button with magnifying glass icon is available
    When the user enters a non-existent username "usuarioquenoexiste123456789" in the search field
    And the user clicks on the search button
    Then the system should query the GitHub API for the entered username
    And the system should receive a 404 not found response
    And the system should display a friendly error message indicating the profile was not found
    And the 404 error image should be visible
    And the profile section should remain empty
    And the metrics dashboard should not display any data
    And the followers list should not be visible