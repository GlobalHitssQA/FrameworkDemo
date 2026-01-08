Feature: Search and display GitHub user profile

  As a user of the GitHub Profile Finder
  I want to search for GitHub users by username
  So that I can view their profile information and metrics

  Background:
    Given the application is loaded and ready to use
    And the user has internet connection
    And the GitHub API is available

  Scenario: Validate successful search and display of an existing GitHub user profile with complete information
    Given I am on the GitHub profile search component
    And the search component displays a text input and search button with magnifying glass icon
    When I enter the username "octocat" in the search input field
    And I click on the search button
    Then the system retrieves the user profile data from GitHub API
    And the user avatar is displayed in the left section
    And the full name and username are displayed correctly
    And the biography is displayed
    And the location is displayed
    And the company is displayed
    And the web link is displayed
    And the Follow button is displayed
    And the Repos counter displays the correct value
    And the Followers counter displays the correct value
    And the Following counter displays the correct value
    And the Gists counter displays the correct value
    And the followers list is displayed in the right section
    And each follower shows avatar, username and profile link