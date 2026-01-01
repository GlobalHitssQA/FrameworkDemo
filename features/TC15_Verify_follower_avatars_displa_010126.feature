Feature: Verify follower avatars display correctly in GitHub profile search

  Scenario: Followers list displays avatar images with proper formatting
    Given the user navigates to the GitHub profile search component
    When the user enters a valid GitHub username with followers in the search input
    And the user clicks the search button to load the profile
    Then the followers list is displayed in the right section
    And each follower entry displays an avatar image
    And all avatar images are properly sized and formatted