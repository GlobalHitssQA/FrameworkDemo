Feature: GitHub Profile Search
  As a user
  I want to search for GitHub profiles by username
  So that I can view user information and metrics

  Scenario: Search for a valid GitHub user profile
    Given I am on the GitHub profile search component
    And the search input and search button are enabled
    When I enter a valid GitHub username in the search field
    And I click the search button
    And I wait for the API response
    Then I should see the user profile information displayed
    And I should see the avatar, full name, username, bio, location, company, website link and follow button