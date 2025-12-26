Feature: GitHub User Profile Search
  As a user of the GitHub Profile Search component
  I want to search for GitHub users by username
  So that I can view their profile information and metrics

  Background:
    Given the user has an active connection to the GitHub API
    And the GitHub profile search component is accessible and functional

  Scenario: Search for an existing GitHub user profile
    Given I am on the GitHub profile search page
    And the search input field and search button are displayed
    When I enter a valid GitHub username "octocat" in the search field
    Then the entered text "octocat" is displayed correctly in the search field
    When I click on the search button with magnifying glass icon
    Then the system performs a query to the GitHub API for the entered username
    And the system successfully retrieves the user profile information
    And the user profile section displays the avatar image
    And the user profile section displays the full name "The Octocat"
    And the user profile section displays the username "octocat"
    And the user profile section displays the location "San Francisco"
    And the user profile section displays the organization "@github"
    And the user profile section displays the website link "https://github.blog"
    And the user profile section displays the Follow button
    And the dashboard displays the Repositories count "8"
    And the dashboard displays the Followers count "21.3k"
    And the dashboard displays the Following count "9"
    And the followers list section displays follower cards with avatars
    And each follower card displays the username with a direct link to their profile