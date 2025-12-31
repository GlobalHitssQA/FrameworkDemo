Feature: GitHub Profile Metrics Dashboard Validation

  As a user of the GitHub Profile Finder application
  I want to see the profile metrics displayed correctly in the dashboard
  So that I can verify the user information retrieved from GitHub API

  Scenario: Validate that total profile metrics are displayed correctly with precise values from API
    Given the GitHub Profile Finder application is loaded
    When I enter the username "torvalds" in the search field
    And I click on the search button
    Then I should see the Repos metric displayed in the dashboard
    And I should see the Followers metric displayed in the dashboard
    And I should see the Following metric displayed in the dashboard
    And I should see the Gists metric displayed in the dashboard
    And all metric values should match the GitHub API data