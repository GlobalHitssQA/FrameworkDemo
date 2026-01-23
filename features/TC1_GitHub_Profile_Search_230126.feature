Feature: GitHub Profile Search
  As a user
  I want to search for GitHub user profiles
  So that I can view their profile information

  Scenario: Search and display a valid GitHub user profile
    Given I access the GitHub profile search component
    And the search input and search button are enabled
    When I enter a valid GitHub username in the search field
    Then the entered text is displayed correctly in the input
    When I click the search button
    Then the system queries the GitHub API
    And the system loads and displays the user profile information
    Then I should see the user avatar
    And I should see the full name and username
    And I should see the followers and following counts
    And I should see the location and organization
    And I should see the website link
    And I should see the Follow button