Feature: GitHub Profile Search
  As a user
  I want to search for GitHub profiles
  So that I can view their information, metrics, and followers

  Scenario: Validate successful retrieval and display of GitHub profile information
    Given I am on the GitHub Profile Search page
    When I enter a valid username "octocat" in the search input
    And I click the search button
    Then I should see the metrics dashboard with Repos, Followers, Following, and Gists
    And I should see the user details section with Avatar, Full Name, Username, Biography, Location, Company, Web Link, and Follow button
    And I should see the followers list with avatar, username, and profile link for each follower
    And the followers list should be scrollable if there are many followers
    When I click on a follower profile link
    Then I should be redirected to the follower GitHub profile page
    And I should see the API request counter indicator