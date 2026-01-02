Feature: GitHub Profile Followers List with Scroll Functionality

  Scenario: Verify followers list displays correctly with scroll functionality
    Given the user navigates to the GitHub profile search component
    When the user searches for a GitHub user with a large number of followers
    Then the user profile is retrieved successfully
    And the followers list section is visible on the right side of the interface
    And each follower entry displays avatar username and profile link
    And the followers list contains more items than the visible container area
    And vertical scroll capability is present on the followers list container
    When the user scrolls down through the followers list
    Then the list scrolls smoothly allowing navigation through all follower entries
    And all followers are accessible through scrolling
    When the user clicks on a follower profile link
    Then the user is redirected to the corresponding GitHub profile page