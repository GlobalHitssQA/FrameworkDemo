Feature: Followers List Display and Navigation

  Scenario: Validate followers list display with scroll functionality and profile redirection
    Given the user is on the GitHub Profile Search component
    And the search input field and search button are enabled
    When the user enters a valid GitHub username with followers in the search field
    And the user clicks the search button
    Then the system retrieves the profile data including the followers list
    And the followers list is displayed in the right section aligned with the main profile component
    And each follower shows an avatar, username, and profile link
    When the number of followers exceeds the container size
    Then the followers list supports vertical scrolling
    When the user clicks on a follower profile link
    Then the user is redirected to the selected follower GitHub profile page
    And the follower profile page loads correctly displaying their public profile