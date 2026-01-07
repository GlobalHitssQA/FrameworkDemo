Feature: GitHub Profile Search
  As a user
  I want to search for GitHub profiles by username
  So that I can view their profile information and metrics

  Scenario: Successfully search for an existing GitHub user profile
    Given the user navigates to the GitHub profile search component
    When the user enters a valid GitHub username "octocat" in the search input field
    And the user clicks the search button
    And the system retrieves the user profile data from GitHub API
    Then the profile dashboard with metrics should be displayed
    And the user details section should show complete information
    And the followers list should be visible