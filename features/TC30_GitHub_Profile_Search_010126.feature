Feature: GitHub Profile Search
  As a user
  I want to search for GitHub user profiles
  So that I can view their profile information and metrics

  Scenario: Search for a valid GitHub user and display profile information
    Given the user navigates to the GitHub profile search component
    And the search component is displayed with a text input field and a search button
    When the user enters a valid GitHub username "octocat" in the search input field
    And the user clicks the search button with magnifying glass icon
    Then the system initiates a request to the GitHub API
    And the user profile information is displayed on the dashboard
    And the metrics section shows Repos, Followers, Following and Gists
    And the followers list is displayed