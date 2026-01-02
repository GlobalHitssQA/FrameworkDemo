Feature: Verify GitHub Profile Metrics Dashboard
  As a user of the GitHub Profile Search application
  I want to see accurate metrics for a GitHub user
  So that I can verify the user's repositories, followers, following, and gists counts

  Scenario: Verify all metrics counters are displayed correctly for a known GitHub user
    Given I am on the GitHub profile search page
    When I search for the GitHub user "torvalds"
    Then the user profile should be loaded successfully
    And the Repos counter should be displayed with a valid number
    And the Followers counter should be displayed with a valid number
    And the Following counter should be displayed with a valid number
    And the Gists counter should be displayed with a valid number
    And all metrics should be visible in the dashboard section