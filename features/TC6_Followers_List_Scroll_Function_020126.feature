Feature: Followers List Scroll Functionality
  As a user viewing a GitHub profile with many followers
  I want to be able to scroll through the followers list
  So that I can view all followers without leaving the page

  Scenario: Verify scroll functionality in followers list for user with many followers
    Given the user navigates to a GitHub profile with a large number of followers
    When the user clicks on the followers link to view the followers list
    Then the followers list should be displayed in the main content area
    And the followers list container should have a defined height limit
    When the user scrolls down within the followers list
    Then additional followers should be revealed through scrolling
    When the user scrolls to the bottom of the followers list
    Then all visible followers on the current page should be accessible
    And pagination controls should be available for more followers
    When the user scrolls back to the top of the followers list
    Then the scroll functionality should work bidirectionally without issues