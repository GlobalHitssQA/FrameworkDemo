Feature: GitHub Profile Search
  As a user of the GitHub Profile Finder application
  I want to search for GitHub users by username
  So that I can view their public profile information, metrics and followers

  Background:
    Given the user has internet access
    And the GitHub API is available and accessible

  @smoke @functional
  Scenario: Successful search for an existing GitHub user with complete profile validation
    Given I am on the GitHub Profile Finder search page
    When I verify the search interface is displayed with input field and search button
    And I enter a valid username "octocat" in the search field
    Then the entered text "octocat" is displayed correctly in the input field
    When I click on the search button
    Then a loading indicator is displayed while processing the request
    And the dashboard metrics section is displayed
    And I verify the Repos counter is visible with a numeric value
    And I verify the Followers counter is visible with a numeric value
    And I verify the Following counter is visible with a numeric value
    And I verify the Gists counter is visible with a numeric value
    And the user profile section is displayed on the left side
    And I verify the user avatar image is visible
    And I verify the full name "The Octocat" is displayed
    And I verify the username "@octocat" is displayed
    And I verify the user biography is displayed
    And I verify the location "San Francisco" is displayed
    And I verify the company "@github" is displayed
    And I verify the website link is displayed
    And I verify the Follow button is visible
    And the followers list section is displayed on the right side
    And I verify the followers list contains avatar, username and profile links
    And I verify the followers list is scrollable if content exceeds container
    And I verify the API requests indicator is displayed in format "X/60"
    When I click on the first follower profile link
    Then I am redirected to the corresponding GitHub profile page
    And I verify the dashboard metrics match the actual GitHub profile data