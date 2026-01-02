Feature: Verify Avatar Image Resolution Quality

  Scenario: Validate avatar image quality for searched user and followers
    Given the user navigates to the GitHub profile search component
    When the user enters a valid GitHub username "octocat" in the search input field
    And the user clicks the search button
    Then the user profile information should be displayed
    And the avatar image should be visible in the user details section
    And the avatar image should load completely without broken image indicators
    And the avatar image should appear clear with appropriate resolution
    And the avatar image source URL should be valid
    When the user scrolls to the followers list section
    Then all follower avatars should be visible
    And each follower avatar should load with correct resolution