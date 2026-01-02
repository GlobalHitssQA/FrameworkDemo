Feature: GitHub Profile Search and Display

  Scenario: Search for a valid GitHub user and verify profile information
    Given the user navigates to the GitHub profile search component
    When the user enters a valid GitHub username "octocat" in the search field
    And the user clicks the search button
    Then the metrics dashboard displays the repository count
    And the metrics dashboard displays the followers count
    And the metrics dashboard displays the following count
    And the metrics dashboard displays the gists count
    And the profile section displays the user avatar
    And the profile section displays the full name and username
    And the profile section displays the biography
    And the profile section displays the location
    And the profile section displays the company
    And the profile section displays the web link
    And the profile section displays the Follow button
    And the followers section displays a list of followers with avatars and usernames
    And the API request indicator displays the current usage status