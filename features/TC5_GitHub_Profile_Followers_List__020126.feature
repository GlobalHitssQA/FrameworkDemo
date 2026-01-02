Feature: GitHub Profile Followers List Scroll Functionality

  Scenario: Verify followers list scroll behavior for users with large follower count
    Given the user accesses the GitHub user search page
    When the user searches for a GitHub user with extensive followers
    And the user navigates to the user profile page
    And the user clicks on the followers count link
    Then the followers list should be displayed
    And the followers container should have scroll functionality enabled
    When the user scrolls down through the followers list
    Then additional followers should be visible
    And the user should be able to navigate through the entire followers list
    And the scroll should stop appropriately at the last follower entry