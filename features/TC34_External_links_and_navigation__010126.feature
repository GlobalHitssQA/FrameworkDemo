Feature: External links and navigation on GitHub user profile

  Scenario: Verify external links and navigation elements work correctly on a user profile
    Given I am on a GitHub user profile page with followers
    Then the profile should display user details and a followers list
    When I click on a follower username or avatar in the followers list
    Then the system navigates to that follower GitHub profile page
    When I return to the original profile page
    And I click on the Follow button
    Then the Follow button redirects to the GitHub login page for authentication
    And all navigation actions work correctly without enabling any editing capabilities