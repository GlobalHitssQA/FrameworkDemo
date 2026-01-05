Feature: GitHub Profile Search

  Scenario: Search and verify GitHub user profile with complete information
    Given the GitHub profile search application is loaded
    When I enter a valid GitHub username "torvalds" in the search input field
    And I click the search button
    Then the API request should complete successfully
    And the metrics dashboard should display Repos, Followers, Following, and Gists
    And the user profile section should display avatar, full name, username, bio, location, company, web link, and Follow button
    And the followers list should display with avatar, username, and profile link for each follower
    When I scroll through the followers list
    Then all followers should remain accessible
    When I click on a follower's profile link
    Then the follower's GitHub profile page should open
    When I navigate back to the search application
    And I click on the web link in the user profile section
    Then the user's personal website should open in a new tab
    And the API request counter should display current usage
    When I search for a non-existent username "nonexistentuserxyz123456"
    Then an error message or empty state should be displayed
    When I perform another valid search with username "github"
    Then the new profile should load correctly replacing previous results