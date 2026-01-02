Feature: Verify GitHub User Profile Metrics Display

  Scenario: Validate that all user metrics are displayed correctly on the profile dashboard
    Given I am on the GitHub search page
    When I search for an existing GitHub user "octocat"
    And I wait for the profile data to load completely
    Then I should see the Repos metric displayed prominently
    And I should see the Followers metric displayed
    And I should see the Following metric displayed
    And I should see the Gists metric displayed
    And all displayed metrics should match the GitHub API response