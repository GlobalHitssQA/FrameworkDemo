Feature: GitHub Profile Metrics Verification
  As a user of the GitHub profile search component
  I want to search for a GitHub user and view their profile metrics
  So that I can see their repositories, followers, following, and gists count

  Scenario: Verify all profile metrics are displayed after searching for a user
    Given I am on the GitHub profile search page
    When I enter a valid GitHub username "octocat" in the search input field
    And I click the search button
    Then the user profile should be displayed
    And the Repos metric should be visible
    And the Followers metric should be visible
    And the Following metric should be visible
    And the Gists metric should be visible