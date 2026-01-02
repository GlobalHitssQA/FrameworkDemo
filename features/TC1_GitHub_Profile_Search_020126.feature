Feature: GitHub Profile Search
  As a user of the GitHub Profile Finder application
  I want to search for GitHub users by username
  So that I can view their profile information and metrics

  Scenario: Search for a valid GitHub user and verify profile information
    Given the user navigates to the GitHub profile search component
    And the search component is displayed with input field and search button
    When the user enters a valid GitHub username "octocat" in the search field
    And the user clicks the search button
    Then the metrics dashboard displays Repos Followers Following and Gists values
    And the user details section displays avatar full name username biography location company and web link
    And the Follow button is visible in the user details section
    And the followers list displays avatars usernames and profile links
    And the API request counter indicator is visible showing consumption limit
    And the followers list supports vertical scrolling when content exceeds container
    When the user clicks on a follower profile link
    Then the system redirects to the corresponding GitHub profile page