Feature: GitHub Profile Search and Display

  Scenario: Search for a valid GitHub user and verify complete profile information
    Given the user navigates to the GitHub profile search component
    And the search interface is displayed with input field and search button
    When the user enters a valid GitHub username "torvalds" in the search input
    And the user clicks the search button to initiate the profile query
    Then the system retrieves and displays the user profile information
    And the metrics dashboard displays Repos, Followers, Following, and Gists counters
    And the left section displays user personal details including Avatar, Full Name, Username, Biography, Location, Company, and Web Link
    And the Follow button is present and functional in the user details section
    And the right section displays the followers list with avatar, username, and profile link
    And the followers list allows scrolling when exceeding container size
    And the API request counter indicator is displayed