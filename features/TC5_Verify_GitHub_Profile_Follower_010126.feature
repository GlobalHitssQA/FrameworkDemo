Feature: Verify GitHub Profile Followers Count

  Scenario: Verify followers count matches GitHub API data
    Given the GitHub Profile Search component is open and ready for input
    When I enter a valid GitHub username with known followers count
    And I click the search button to execute the search
    Then the dashboard metrics section should be visible
    And the Followers count should match the actual follower count from the GitHub API