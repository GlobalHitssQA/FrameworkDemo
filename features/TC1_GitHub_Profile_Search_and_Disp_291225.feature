Feature: GitHub Profile Search and Display
  As a user of the GitHub Profile Search application
  I want to search for GitHub users and view their complete profile information
  So that I can access user details, metrics, and followers list

  Scenario: Validate successful user search and complete profile information display
    Given the GitHub profile search component is displayed
    When I enter a valid GitHub username "octocat" in the search field
    And I click the search button to execute the query
    Then the metrics dashboard displays the correct totals for repos, followers, following, and gists
    And the user profile section displays avatar, full name, username, biography, location, company, web link, and follow button
    And the followers list section displays avatars, usernames, and profile links for each follower
    And the API request counter indicator displays the current usage limit