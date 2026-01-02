Feature: Verify followers list display on GitHub profile

  Scenario: User verifies followers list contains avatar, username and profile link for each follower
    Given the user navigates to a GitHub profile with multiple followers
    When the user clicks on the followers link
    Then the followers list section is visible
    And each follower entry displays an avatar image
    And each follower entry shows the username
    And each follower entry contains a direct link to their GitHub profile