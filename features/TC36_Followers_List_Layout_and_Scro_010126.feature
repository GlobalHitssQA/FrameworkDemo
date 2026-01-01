Feature: Followers List Layout and Scroll Functionality

  Scenario: Verify followers list layout alignment and scroll behavior
    Given the user navigates to the GitHub Profile Finder application
    When the user searches for a GitHub user with many followers
    Then the user profile is loaded with a followers list containing multiple entries
    And the followers list section is positioned on the right side aligned with user details
    And each follower entry displays an avatar username and profile link
    When the user scrolls the followers list vertically
    Then the followers list allows scrolling without affecting other components layout
    And alignment and spacing remain consistent during scroll
    When the user searches for a GitHub user with few followers
    Then no scroll appears and the followers list displays properly aligned