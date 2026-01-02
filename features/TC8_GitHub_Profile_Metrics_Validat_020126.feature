Feature: GitHub Profile Metrics Validation
  As a user of the GitHub profile search component
  I want to search for a GitHub user and verify their metrics
  So that I can ensure the displayed data matches the real GitHub API data

  Scenario: Verify all profile metrics match GitHub API data
    Given I am on the GitHub profile search component
    When I enter a valid GitHub username "torvalds" in the search input field
    And I click the search button
    Then the user profile should be displayed
    And the Repos counter should match the GitHub API value
    And the Followers counter should match the GitHub API value
    And the Following counter should match the GitHub API value
    And the Gists counter should match the GitHub API value
    And all metric counters should match exactly with the GitHub API real data