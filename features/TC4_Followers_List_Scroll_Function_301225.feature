Feature: Followers List Scroll Functionality
  As a user of the GitHub Profile Search component
  I want to scroll through the followers list
  So that I can view all followers when the list exceeds the container height

  Scenario: Validate scroll functionality in followers list for users with many followers
    Given the GitHub Profile Search component is accessible
    When I enter a username with more than fifty followers in the search field
    And I click the search button to load the profile
    Then the followers list should be displayed in a vertical layout in the right section
    And each follower entry should display avatar username and profile link
    And the followers list container should have scroll functionality when content exceeds visible area
    When I scroll down through the followers list
    Then additional follower entries should be revealed without affecting the main profile section
    When I scroll back up to the top of the followers list
    Then the list should return to the initial position smoothly
    When I click on a follower profile link
    Then I should be redirected to the corresponding GitHub profile page