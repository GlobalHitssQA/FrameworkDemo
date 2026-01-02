Feature: Follower Profile Link Navigation

  Scenario: Navigate to follower profiles from user followers list
    Given I am on the GitHub profile page of a user with followers
    When I navigate to the followers tab
    Then I should see the followers list with avatars and usernames
    When I click on the first follower profile link
    Then I should be redirected to the first follower GitHub profile page
    And the profile page should display the correct username
    When I navigate back to the original user followers page
    And I click on the second follower profile link
    Then I should be redirected to the second follower GitHub profile page
    And the profile page should display the correct username
    And I should not have any edit capabilities on the profile