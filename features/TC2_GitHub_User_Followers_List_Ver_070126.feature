Feature: GitHub User Followers List Verification

  Scenario: Verify followers list displays correctly with scroll functionality for users with many followers
    Given the user navigates to GitHub homepage
    When the user searches for an existing GitHub user with a large number of followers
    Then the user profile is successfully retrieved and displayed
    And the followers list section is visible and properly positioned
    And each follower item displays avatar username and profile link
    And the list is presented in vertical alignment
    And the number of followers exceeds the visible container height
    When the user scrolls down within the followers list container
    Then the scroll functionality works smoothly without affecting other page sections
    When the user clicks on a follower profile link
    Then the system redirects to the corresponding GitHub profile page for that follower