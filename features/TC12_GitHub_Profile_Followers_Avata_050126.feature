Feature: GitHub Profile Followers Avatar Display Validation

  Scenario: Verify follower avatars are displayed correctly with proper quality and proportions
    Given the user navigates to the GitHub profile search component
    When the user enters a valid GitHub username with followers in the search input field
    And the user clicks the search button to retrieve the profile
    Then the followers list section should be displayed on the right side
    And each follower entry should display an avatar image
    And avatar images should be displayed with proper dimensions and aspect ratio without distortion