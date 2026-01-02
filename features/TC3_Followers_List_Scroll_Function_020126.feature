Feature: Followers List Scroll Functionality

  Scenario: Verify followers list displays correctly and allows scrolling for users with many followers
    Given the user is on the GitHub Profile Search page
    When the user enters a username with many followers in the search field
    And the user clicks the search button
    Then the user profile is displayed with the followers list in the right section
    And each follower displays an avatar, username, and profile link
    And the followers list allows vertical scrolling when followers exceed container height
    When the user scrolls down through the followers list
    Then the list scrolls smoothly displaying all followers beyond the initial viewport
    When the user clicks on a follower profile link
    Then the system opens the GitHub profile page for that follower