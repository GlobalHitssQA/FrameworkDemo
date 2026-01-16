Feature: GitHub Profile Followers List Scroll Functionality

  Scenario: Validate vertical scroll in followers list when followers exceed container size
    Given I am on the GitHub homepage
    When I search for a user with more than ten followers
    Then the user profile is displayed successfully
    And the followers section is visible on the right side
    And each follower displays avatar username and profile link
    And the vertical scrollbar is visible in the followers container
    When I scroll down in the followers list
    Then the list scrolls correctly showing previously hidden followers
    And the scroll is smooth and continuous
    When I click on a follower profile link
    Then I am redirected to the follower GitHub profile page