Feature: Search GitHub user profile
  As a user of the GitHub Profile Finder application
  I want to search for a GitHub user by username
  So that I can view their profile information

  Scenario: Search for an existing GitHub user
    Given I am on the GitHub Profile Finder application
    When I enter a valid GitHub username "octocat" in the search field
    And I click the search button with magnifying glass icon
    Then I should see the user profile information displayed
    And I should see the user avatar image
    And I should see the full name "The Octocat"
    And I should see the username "octocat"