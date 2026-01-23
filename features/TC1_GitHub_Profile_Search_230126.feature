Feature: GitHub Profile Search
  As a user
  I want to search for GitHub user profiles
  So that I can view their profile information

  Scenario: Search for a valid GitHub user and view profile information
    Given I am on the GitHub search page
    When I enter a valid username in the search field
    And I click the search button
    And I wait for the search results to load
    Then I should see the user profile information displayed
    And I should see the avatar, full name, username, bio, location, organization, website link and Follow button