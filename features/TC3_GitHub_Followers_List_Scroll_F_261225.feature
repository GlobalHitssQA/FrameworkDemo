Feature: GitHub Followers List Scroll Functionality
  As a user of the GitHub Profile Search application
  I want to see a scrollable list of followers
  So that I can browse through all followers when the list exceeds the visible container

  Background:
    Given the GitHub API is available and responding

  Scenario: Validate vertical scroll functionality in followers list
    Given I am on the GitHub profile search interface
    When I search for a GitHub user "torvalds" with many followers
    Then the system should display the user profile successfully
    And the followers list should be displayed in the right section
    And each follower should display avatar, username and profile link
    When the number of followers exceeds the container size
    Then vertical scroll should be enabled on the followers list
    When I scroll down in the followers list
    Then additional followers should become visible
    When I click on a follower profile link
    Then I should be redirected to that follower's GitHub profile page