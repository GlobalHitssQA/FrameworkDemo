Feature: Followers List Display and Scroll Functionality

  As a user of the GitHub Profile Finder application
  I want to see the list of followers with their avatars, usernames and profile links
  So that I can browse and access their profiles easily

  Scenario: Validate followers list section with scroll capability
    Given the GitHub Profile Finder application is loaded
    When I enter a GitHub username with multiple followers in the search field
    And I click the search button
    Then the followers list should be displayed in the right section
    And each follower should display an avatar image
    And each follower should display a username
    And each follower should have a link to their GitHub profile
    When I scroll down in the followers list container
    Then additional followers should become visible
    When I click on a follower profile link
    Then I should be redirected to the follower GitHub profile page