Feature: GitHub Profile Followers List Scroll

  Scenario: Verify followers list vertical scroll functionality
    Given the user navigates to the GitHub profile search component
    When the user searches for a GitHub user with a large number of followers
    Then the profile should load successfully
    And the followers list should display multiple entries
    And the followers list container should have a defined height limit
    When the user scrolls down within the followers list
    Then additional follower entries should be revealed
    When the user scrolls to the bottom of the followers list
    Then the scrolling should stop at the last follower entry without errors
    When the user scrolls back to the top of the followers list
    Then the list should return to the initial view showing the first followers