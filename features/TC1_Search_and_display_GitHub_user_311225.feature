Feature: Search and display GitHub user profile information

  Scenario: Verify complete profile information is displayed after searching for a valid GitHub user
    Given the user navigates to the GitHub profile search component
    And the search interface is displayed with a text input field and search button
    When the user enters a valid GitHub username "torvalds" in the search input field
    And the user clicks the search button to execute the query
    Then the system initiates the API call and loads the profile data
    And the dashboard metrics section displays Repos, Followers, Following, and Gists counters with numerical values
    And the left section displays the user avatar image
    And the left section displays the full name and username
    And the left section displays the biography text
    And the left section displays location and company information
    And the left section displays the web link
    And the left section displays the Follow button
    And the right section displays a scrollable list of followers with avatar, username, and profile link
    And the API request counter indicator is visible showing the consumed API limit
    And the user avatar image is fully loaded without broken image placeholders
    And all metric counters match the actual GitHub API response data