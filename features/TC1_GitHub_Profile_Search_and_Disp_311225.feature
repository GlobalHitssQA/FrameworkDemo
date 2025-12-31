Feature: GitHub Profile Search and Display

  Scenario: Search for a valid GitHub user and verify complete profile information
    Given the user navigates to the GitHub profile search component
    When the user enters a valid username "octocat" in the search input field
    And the user clicks the search button
    Then the metrics dashboard displays the correct values for repos followers following and gists
    And the left section displays the user personal information including avatar name biography location company web link and follow button
    And the right section displays a scrollable followers list with avatars usernames and profile links
    And the API request limit indicator is displayed
    When the user clicks on a follower profile link
    Then the system redirects to the corresponding GitHub profile page
    When the user resizes the browser to mobile dimensions
    Then the interface adapts correctly to mobile view