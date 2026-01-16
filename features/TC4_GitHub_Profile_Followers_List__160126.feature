Feature: GitHub Profile Followers List Validation
  As a user of the GitHub Profile Finder application
  I want to view the followers list with scroll functionality
  So that I can browse and navigate to individual follower profiles

  Scenario: Validate followers list display with scroll and profile redirection
    Given I am on the GitHub profile finder application
    When I search for a user with more than ten followers
    Then the user profile information should be displayed
    And the followers list should be visible in the right section
    And each follower should display avatar username and profile link
    And the followers list should be scrollable when exceeding container size
    When I scroll down the followers list
    Then I should be able to navigate through all followers
    When I click on a follower profile link
    Then I should be redirected to the follower GitHub profile page