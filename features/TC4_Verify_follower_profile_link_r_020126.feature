Feature: Verify follower profile link redirection on GitHub

  Scenario: Click on follower link and verify redirection to GitHub profile
    Given I navigate to the GitHub profile search component
    When I search for a GitHub username with followers
    And the profile and followers data are displayed
    Then I should see the followers list with avatars and usernames
    When I click on a follower profile link
    Then I should be redirected to the follower's GitHub profile page
    And the GitHub profile page should load successfully
    When I return to the search component
    Then all follower links should redirect correctly to their respective profiles