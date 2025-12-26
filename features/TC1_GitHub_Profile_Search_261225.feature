Feature: GitHub Profile Search
  As a user of the GitHub Profile Finder
  I want to search for existing GitHub profiles
  So that I can view user information and metrics

  Background:
    Given the GitHub API connection is active
    And the GitHub Profile Search component is accessible

  Scenario: Search for an existing GitHub user profile
    Given I am on the GitHub Profile Search page
    When I enter the username "octocat" in the search field
    And I click the search button with magnifying glass icon
    Then the system should query the GitHub API for the user
    And I should see the user profile section on the left side
    And the profile should display the user avatar
    And the profile should display the full name "The Octocat"
    And the profile should display the username "octocat"
    And the profile should display the user biography
    And the profile should display the location "San Francisco"
    And the profile should display the company "@github"
    And the profile should display the personal website link
    And the profile should display the Follow button
    And I should see the metrics dashboard with Repos count
    And I should see the metrics dashboard with Followers count
    And I should see the metrics dashboard with Following count
    And I should see the metrics dashboard with Gists count
    And I should see the followers list on the right section
    And each follower should display their avatar
    And each follower should display their username
    And each follower should have a direct profile link