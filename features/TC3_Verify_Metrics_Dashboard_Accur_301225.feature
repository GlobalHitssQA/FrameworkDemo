Feature: Verify Metrics Dashboard Accuracy

  Scenario: Verify that metrics dashboard counters match GitHub API values
    Given the GitHub Profile Search component is accessible
    And the GitHub API is responding normally
    When I obtain reference metrics from GitHub API for user "torvalds"
    And I enter the username "torvalds" in the search input field
    And I click the search button to retrieve the profile
    Then the profile data should be loaded successfully
    And the Repos counter should match the GitHub API value
    And the Followers counter should match the GitHub API value
    And the Following counter should match the GitHub API value
    And the Gists counter should match the GitHub API value
    And all metric counters should be visible and properly formatted