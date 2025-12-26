Feature: Followers List Scroll Functionality

  Scenario: Validate vertical scroll in followers list when followers exceed container size
    Given the user accesses the GitHub Profile Search component
    When the user searches for a GitHub user with many followers
    Then the system displays the user profile with followers list
    And the followers list is displayed vertically aligned in the right section
    And each follower displays avatar, username and profile link
    And the followers list has vertical scroll enabled when content exceeds container
    When the user scrolls down in the followers list
    Then additional followers that were not initially visible are displayed
    When the user clicks on a follower profile link
    Then the system redirects to the selected follower GitHub profile page