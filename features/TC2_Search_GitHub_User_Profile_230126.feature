Feature: Search GitHub User Profile

  Scenario: User searches for a GitHub profile and views profile information
    Given the user is on the GitHub homepage
    When the user navigates to a profile page with username "octocat"
    Then the user should see the profile avatar
    And the user should see the full name "The Octocat"
    And the user should see the username "octocat"
    And the user should see the followers count
    And the user should see the following count
    And the user should see the location "San Francisco"
    And the user should see the organization link
    And the user should see the website link
    And the user should see the Follow button
    And the user should see the repositories tab with count