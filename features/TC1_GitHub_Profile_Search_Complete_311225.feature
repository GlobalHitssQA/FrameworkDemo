Feature: GitHub Profile Search Complete Display

  As a user of the GitHub Profile Search application
  I want to search for GitHub users and view their complete profile information
  So that I can analyze their metrics, personal data, and followers list

  Scenario: Validate the complete display of an existing GitHub user profile including personal information, metrics, and followers list
    Given the user navigates to the GitHub profile search component
    And the search component displays a text input field and a search button with magnifying glass icon
    When the user enters a valid existing GitHub username "octocat" in the search input field
    And the user clicks the search button to execute the search
    Then the metrics dashboard displays the total values for Repos, Followers, Following, and Gists
    And the left section displays the user personal information including avatar, full name, username, biography, location, company, web link, and follow button
    And the right section displays a vertical scrollable list of followers with avatars, usernames, and profile links
    And the user avatar image loads correctly without broken image errors
    And the API request counter indicator displays the consumed API limit
    When the user clicks on a follower link in the followers list
    Then the system redirects to the corresponding GitHub profile page for that follower