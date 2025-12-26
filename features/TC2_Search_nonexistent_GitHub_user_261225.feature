Feature: Search non-existent GitHub user error handling
  As a user of the GitHub Profile Finder application
  I want to see a friendly error message when searching for a non-existent user
  So that I understand the search was unsuccessful and can try again

  Background:
    Given the GitHub API is available and accessible
    And I have internet connection

  @error-handling @negative-test
  Scenario: Display friendly error message when searching for non-existent GitHub user
    Given I am on the GitHub Profile Finder search page
    And I can see the search input field and search button with magnifying glass icon
    When I enter "usuarioQueNoExiste123XYZ" in the search input field
    And I click the search button
    Then the system should query the GitHub API
    And I should see a friendly error message indicating the user was not found
    And the error message should contain text like "Lo sentimos, no pudimos encontrar al usuario que buscas"
    And the user profile details section should not be displayed
    And the metrics dashboard should not show any data
    And the followers list should be empty or hidden
    And the API requests counter should be incremented