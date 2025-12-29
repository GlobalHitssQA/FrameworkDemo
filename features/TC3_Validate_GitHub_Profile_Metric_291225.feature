Feature: Validate GitHub Profile Metrics Accuracy

  Scenario: Verify metric counters match GitHub API response data
    Given the GitHub profile search component is loaded
    When I search for a GitHub user with username "octocat"
    Then the profile should load successfully
    And the Repos counter should display the correct public repository count
    And the Followers counter should display the correct follower count
    And the Following counter should display the correct following count
    And the Gists counter should display the correct public gists count
    And all displayed metrics should match the GitHub API response