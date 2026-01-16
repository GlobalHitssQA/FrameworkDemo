Feature: GitHub User Profile Search

  Scenario: Search for a GitHub user by username and view profile details
    Given the user is on the GitHub search page
    When the user enters a valid GitHub username "octocat" in the search field
    And the user clicks the search button
    And the user filters results by Users
    And the user clicks on the user profile link
    Then the user profile is displayed with avatar and full name
    And the profile metrics are visible including followers and following counts
    And the user information section displays location and organization
    And the followers list is accessible from the profile