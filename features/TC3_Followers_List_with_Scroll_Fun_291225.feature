Feature: Followers List with Scroll Functionality

  Background:
    Given the user has access to the GitHub Profile Finder component
    And the GitHub API is available and accessible

  Scenario: Validate followers list section displays correctly with functional scroll
    Given I perform a successful search for a GitHub user with multiple followers
    When the profile is loaded successfully
    Then I should see the followers list displayed in the right section
    And the followers list should be displayed vertically aligned with the main component
    And each follower should display their avatar image
    And each follower should display their username
    And each follower should have a direct link to their GitHub profile
    When I click on a specific follower link
    Then I should be redirected to the selected follower GitHub profile page
    When the number of followers exceeds the container size
    Then the followers list should have a functional vertical scroll bar
    And I should be able to scroll through all followers without losing design alignment