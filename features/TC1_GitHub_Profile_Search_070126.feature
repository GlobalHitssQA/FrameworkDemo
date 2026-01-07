Feature: GitHub Profile Search
  As a user
  I want to search for GitHub profiles
  So that I can view complete profile information for existing users

  Scenario: Validate successful search and complete profile information display for an existing GitHub user
    Given the GitHub Profile Search component is accessible
    When I enter a valid GitHub username "octocat" in the search input field
    And I click the search button
    Then the user profile section displays the avatar image
    And the user profile section displays the full name "The Octocat"
    And the user profile section displays the username "octocat"
    And the user profile section displays the location "San Francisco"
    And the user profile section displays the organization "@github"
    And the user profile section displays the website link "https://github.blog"
    And the user profile section displays the Follow button
    And the metrics dashboard displays the followers count
    And the metrics dashboard displays the following count
    And the metrics dashboard displays the repositories count
    And the followers list section displays follower avatars and profile links