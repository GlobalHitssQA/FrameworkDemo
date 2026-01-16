Feature: Dashboard metrics validation

  As a user
  I want to see the profile metrics on the dashboard
  So that I can verify the user statistics are displayed correctly

  Scenario: Validate that Repos, Followers, Following and Gists metrics are displayed correctly
    Given I am on the GitHub Profile Finder application
    When I search for an existing GitHub user with public metrics
    Then I should see the user profile information displayed
    And I should see the Repos metric with a numeric value
    And I should see the Followers metric with a numeric value
    And I should see the Following metric with a numeric value
    And I should see the Gists metric with a numeric value
    And the displayed metrics should match the GitHub API values