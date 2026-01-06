Feature: GitHub Profile Search and Information Display

  Scenario: Search for a valid GitHub user and verify complete profile information
    Given the user navigates to the GitHub profile search component
    When the user enters a valid existing GitHub username "octocat" in the search input field
    And the user clicks on the search button with the magnifying glass icon
    Then the metrics dashboard displays the total values for Repos, Followers, Following, and Gists
    And the left section displays the user's avatar image
    And the left section shows the full name and username
    And the biography section displays the user's profile description
    And the location and company information are displayed
    And the web link field shows the personal or portfolio URL
    And the Follow button is present and functional
    And the right section displays a vertical list of followers
    And each follower entry shows avatar, username, and profile link
    And the followers list allows scrolling when the number exceeds container size
    And the API request limit indicator is displayed showing current usage
    When the user clicks on a follower's profile link
    Then the system redirects to the corresponding GitHub profile page for that follower