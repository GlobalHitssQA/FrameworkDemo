Feature: Dashboard metrics display validation
  As a user of the GitHub Profile Finder
  I want to see the user metrics displayed prominently on the dashboard
  So that I can quickly understand the user's GitHub activity

  Scenario: Validate that dashboard metrics are displayed correctly for an existing GitHub user
    Given I am on the GitHub Profile Finder application
    When I search for an existing GitHub user with complete public data
    Then the system should retrieve and display the user profile correctly
    And I should see the metrics section displayed prominently
    And I should see the Repos metric with the total number of public repositories
    And I should see the Followers metric with the total number of followers
    And I should see the Following metric with the number of profiles the user follows
    And I should see the Gists metric with the total number of public gists
    And all metric values should match the actual GitHub API data